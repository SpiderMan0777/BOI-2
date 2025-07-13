import requests
import sys
import json
from datetime import datetime

class BankOfIndiaBCPointAPITester:
    def __init__(self, base_url="https://43c836ff-e1dd-48bb-ace1-786a0e92675c.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    print(f"   Response: {response.text[:200]}...")
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API Endpoint", "GET", "", 200)

    def test_services_endpoint(self):
        """Test services endpoint"""
        return self.run_test("Get Services", "GET", "services", 200)

    def test_daily_content_endpoint(self):
        """Test daily content endpoint"""
        return self.run_test("Get Daily Content", "GET", "daily-content", 200)

    def test_ai_query_endpoint(self):
        """Test AI query endpoint with different languages"""
        test_queries = [
            {"query": "How to open a new account?", "language": "en"},
            {"query": "नया खाता कैसे खोलें?", "language": "hi"},
            {"query": "नवीन खाते कसे उघडावे?", "language": "mr"}
        ]
        
        results = []
        for query_data in test_queries:
            success, response = self.run_test(
                f"AI Query ({query_data['language']})", 
                "POST", 
                "ai-query", 
                200, 
                data=query_data
            )
            results.append((success, response))
        
        return results

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test creating a status check
        status_data = {"client_name": "test_client"}
        create_success, create_response = self.run_test(
            "Create Status Check", 
            "POST", 
            "status", 
            200, 
            data=status_data
        )
        
        # Test getting status checks
        get_success, get_response = self.run_test(
            "Get Status Checks", 
            "GET", 
            "status", 
            200
        )
        
        return create_success, get_success

    def test_admin_endpoints(self):
        """Test admin endpoints"""
        # Test getting admin users
        get_users_success, get_users_response = self.run_test(
            "Get Admin Users", 
            "GET", 
            "admin/users", 
            200
        )
        
        # Test creating admin user
        admin_data = {
            "username": "test_admin",
            "email": "test@admin.com",
            "role": "admin"
        }
        create_user_success, create_user_response = self.run_test(
            "Create Admin User", 
            "POST", 
            "admin/users", 
            200, 
            data=admin_data
        )
        
        return get_users_success, create_user_success

    def test_terms_policy_endpoint(self):
        """Test terms and policy endpoint"""
        return self.run_test("Get Terms & Policy", "GET", "terms-policy", 200)

    def test_create_service_endpoint(self):
        """Test creating a new service"""
        service_data = {
            "name_en": "Test Service",
            "name_hi": "परीक्षण सेवा",
            "name_mr": "चाचणी सेवा",
            "description_en": "This is a test service",
            "description_hi": "यह एक परीक्षण सेवा है",
            "description_mr": "ही एक चाचणी सेवा आहे",
            "icon": "test-icon"
        }
        return self.run_test(
            "Create Service", 
            "POST", 
            "services", 
            200, 
            data=service_data
        )

    def test_create_daily_content_endpoint(self):
        """Test creating daily content"""
        content_data = {
            "type": "quote",
            "content_en": "Test quote in English",
            "content_hi": "अंग्रेजी में परीक्षण उद्धरण",
            "content_mr": "इंग्रजीत चाचणी कोट",
            "author": "Test Author"
        }
        return self.run_test(
            "Create Daily Content", 
            "POST", 
            "daily-content", 
            200, 
            data=content_data
        )

def main():
    print("🚀 Starting Bank of India BC Point API Tests")
    print("=" * 60)
    
    tester = BankOfIndiaBCPointAPITester()
    
    # Test all endpoints
    print("\n📋 Testing Core Endpoints...")
    tester.test_root_endpoint()
    tester.test_services_endpoint()
    tester.test_daily_content_endpoint()
    tester.test_terms_policy_endpoint()
    
    print("\n🤖 Testing AI Query Endpoint...")
    ai_results = tester.test_ai_query_endpoint()
    
    print("\n📊 Testing Status Endpoints...")
    create_status, get_status = tester.test_status_endpoints()
    
    print("\n👨‍💼 Testing Admin Endpoints...")
    get_admin, create_admin = tester.test_admin_endpoints()
    
    print("\n➕ Testing Create Endpoints...")
    tester.test_create_service_endpoint()
    tester.test_create_daily_content_endpoint()
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())