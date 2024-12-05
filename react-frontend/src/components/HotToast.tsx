import { Toaster, toast } from 'react-hot-toast';
import './customToastStyles.css'; // Custom CSS for the toast

const HotToast = () => {
  const notify = () =>
    toast('Task updated successfully!', {
      // Customization Options
      icon: '✅', // Custom icon
      duration: 5000, // How long the toast stays visible (in ms)
      position: 'top-right', // Position: top-right, top-center, bottom-right, etc.
      
      // Styling with JSX
      style: {
        background: '#333', // Custom background color
        color: '#fff', // Custom text color
        fontSize: '16px', // Custom font size
        padding: '16px', // Custom padding
        borderRadius: '10px', // Custom border-radius for rounded corners
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' // Custom shadow for a modern look
      },
      
      // Adding custom classes for more styling
      className: 'custom-toast', // Add a custom CSS class for more control
      
      // Animations
      animation: {
        enter: 'fadeIn 0.3s ease-out',
        exit: 'fadeOut 0.3s ease-in'
      },
    });

  return (
    <div>
      <button onClick={notify}>Show Customized Notification</button>
      <Toaster
        toastOptions={{
          // Default options applied to every toast
          duration: 4000,
          style: {
            background: '#222',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default HotToast;
