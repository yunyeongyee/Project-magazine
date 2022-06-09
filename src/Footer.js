import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

/*CSS*/
import './App.css';

const Footer= (props) => {

    return (
       <footer className="Footer">
          <CloudUploadIcon
             className="CloudUploadIcon"
             onClick={()=> {
                window.location.replace('./Upload');
             }}
             sx={{ fontSize: 70 }}
          />
       </footer>
    );
}

export default Footer;