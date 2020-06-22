import axios from 'axios';

const uploadFile = (values) => {
  try {
    var formData = new FormData();
    formData.set('file', values.file_drop_zone[0]);
    const result = axios.post(`/api/v1.0/upload`, formData);
    return result;
  } catch (err) {
    return err;
  }
};

export {uploadFile};
