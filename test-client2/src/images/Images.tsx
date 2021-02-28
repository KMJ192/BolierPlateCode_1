import main_logo from './rust_logo.png';
import user_image from './user_image.png';

function OutputImage(option : number) : string{
    let imgPath : string = "";

    if(option === 1){
        imgPath = main_logo;
    }else if(option === 2){
        imgPath = user_image;
    }

    return imgPath;
}

export default OutputImage;