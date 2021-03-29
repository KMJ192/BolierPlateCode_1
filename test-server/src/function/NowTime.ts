export function NowTime() : string{
    let dateTime = new Date();
    let temp : string = String(dateTime.getFullYear());
    //month 길이
    if(String(dateTime.getMonth()).length == 1){
        temp = temp + "/0" + String(dateTime.getMonth());
    }else{
        temp = temp + "/" + String(dateTime.getMonth());
    }

    //day길이
    if(String(dateTime.getDate()).length == 1){
        temp = temp + "/0" + String(dateTime.getDate());
    }else{
        temp = temp + "/" + String(dateTime.getDate());
    }

    //hour 길이
    if(String(dateTime.getHours()).length == 1){
        temp = temp + " 0" + String(dateTime.getHours());
    }else{
        temp = temp + " " + String(dateTime.getHours());
    }

    //minute 길이
    if(String(dateTime.getMinutes()).length == 1){
        temp = temp +  ":0" + String(dateTime.getMinutes());
    }else{
        temp = temp + ":" + String(dateTime.getMinutes());
    }

    //second 길이
    if(String(dateTime.getSeconds()).length == 1){
        temp = temp + ":0" + String(dateTime.getSeconds());
    }else{
        temp = temp + ":" + String(dateTime.getSeconds());
    }

    temp = temp + ":" + String(dateTime.getMilliseconds());

    return temp;
}
