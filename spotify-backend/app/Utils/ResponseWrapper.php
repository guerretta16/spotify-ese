<?php

namespace App\Utils;

use Illuminate\Http\Request;
use App\Models\Album_Favorito;
use Carbon\Carbon;

define('SUCCESS', 0);
define('ERROR', 1);

class ResponseWrapper 
{
    public static function messageDescriptionError($typeMessage, $descriptionMessage, $data = []) {
        $codeError = SUCCESS;
        if($typeMessage == "Error") {
            $codeError = ERROR;
        }
        if(count($data) == 0){
            return  [
                "codeError" => $codeError,
                "message" => $typeMessage,
                "descripcionMessage" => $descriptionMessage,
                "dateMessage" => Carbon::now()
            ];
        }
        else {
            return  [
                "data" => $data,
                "codeError" => $codeError,
                "message" => $typeMessage,
                "descripcionMessage" => $descriptionMessage,
                "dateMessage" => Carbon::now()
            ];
        }
    }

    public static function SaveResponseMessage($responseBool)
    {
        if($responseBool) {
            return ResponseWrapper::messageDescriptionError("Ok", "Registro guardado exitosamente");
        } else {
            return ResponseWrapper::messageDescriptionError("Error", "No se ha podido guardar el registro");
        }
    }

    public static function DeleteResponseMessage($responseBool)
    {
        if($responseBool) {
            return ResponseWrapper::messageDescriptionError("Ok", "Item eliminado exitosamente");
        } else {
            return ResponseWrapper::messageDescriptionError("Error", "No se ha podido eliminar el item");
        }
    }

    public static function ExistResponseMessage($responseBool)
    {
        if($responseBool) {
            return ResponseWrapper::messageDescriptionError("Ok", "El registro ya existe");
        }
    }

    public static function GetResponseWrapper($responseBool, $data){
        if($responseBool){
            return ResponseWrapper::messageDescriptionError("Ok", "Datos obtenidos correctamente", $data);
        }
        else{
            return ResponseWrapper::messageDescriptionError("Error", "Modelo sin datos almacenados");
        }    
    }
}