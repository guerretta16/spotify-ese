<?php

namespace App\Utils;

use Illuminate\Http\Request;
use App\Models\FavoriteAlbum_;
use Carbon\Carbon;

define('SUCCESS', 0);
define('ERROR', 1);

class ResponseWrapper
{
    public static function messageDescriptionError($typeMessage, $descriptionMessage, $data = []) {
        $codeError = SUCCESS;
        if($typeMessage === "Error") {
            $codeError = ERROR;
        }
        else if(count($data) === 0){
            return  [
                "codeError" => $codeError,
                "message" => $typeMessage,
                "descriptionMessage" => $descriptionMessage,
                "dateMessage" => Carbon::now()
            ];
        }
        else {
            return  [
                "data" => $data,
                "codeError" => $codeError,
                "message" => $typeMessage,
                "descriptionMessage" => $descriptionMessage,
                "dateMessage" => Carbon::now()
            ];
        }
    }

    public static function SaveResponseMessage($responseBool): ?array
    {
        if($responseBool) {
            return self::messageDescriptionError("Ok", "Saved Successfully!!!");
        }

        return self::messageDescriptionError("Error", "Ops, it can´t be saved!");
    }

    public static function DeleteResponseMessage($responseBool): ?array
    {
        if($responseBool) {
            return self::messageDescriptionError("Ok", "Item deleted successfully");
        }

        return self::messageDescriptionError("Error", "Ops, it can´t be deleted!");
    }

    public static function ExistResponseMessage($responseBool)
    {
        if($responseBool) {
            return self::messageDescriptionError("Ok", "This item exists!!!");
        }
    }

    public static function GetResponseWrapper($responseBool, $data): ?array
    {
        if($responseBool){
            return self::messageDescriptionError("Ok", "Successfully obtained data", $data);
        }

        return self::messageDescriptionError("Error", "Model with no stored data");
    }
}
