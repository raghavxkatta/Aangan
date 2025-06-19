import { toast as hotToast } from 'react-hot-toast';

export const toast = (message) => {
    hotToast.success(message);
};
