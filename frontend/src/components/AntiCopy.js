import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const AntiCopy = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      toast.error(t('copyDisabled'));
      return false;
    };

    // Disable text selection
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable copy keyboard shortcuts
    const handleKeyDown = (e) => {
      // Disable Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+U, F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 85)) ||
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
        (e.ctrlKey && e.shiftKey && e.keyCode === 75)
      ) {
        e.preventDefault();
        toast.error(t('copyDisabled'));
        return false;
      }
    };

    // Disable drag and drop
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable print screen
    const handleKeyUp = (e) => {
      if (e.keyCode === 44) {
        toast.error(t('screenshotDisabled'));
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('dragstart', handleDragStart);

    // Disable text selection via CSS
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    document.body.style.userSelect = 'none';

    // Disable drag
    document.body.style.webkitUserDrag = 'none';

    // Disable highlighting
    document.body.style.webkitTouchCallout = 'none';
    document.body.style.webkitTapHighlightColor = 'transparent';

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('dragstart', handleDragStart);
      
      // Reset styles
      document.body.style.webkitUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.body.style.msUserSelect = '';
      document.body.style.userSelect = '';
      document.body.style.webkitUserDrag = '';
      document.body.style.webkitTouchCallout = '';
      document.body.style.webkitTapHighlightColor = '';
    };
  }, [t]);

  // Visual deterrent - blur content when dev tools might be open
  useEffect(() => {
    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      if (widthThreshold || heightThreshold) {
        document.body.style.filter = 'blur(5px)';
        toast.error(t('screenshotDisabled'));
      } else {
        document.body.style.filter = '';
      }
    };

    // Check every 500ms
    const interval = setInterval(checkDevTools, 500);

    return () => {
      clearInterval(interval);
      document.body.style.filter = '';
    };
  }, [t]);

  return null;
};

export default AntiCopy;