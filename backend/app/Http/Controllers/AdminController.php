<?php

namespace App\Http\Controllers;

use App\Models\Word;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        return response()->json([
            "cards" => [
                [
                    "title" => "Download",
                    "desc" => "baixar",
                    "icon" => "download"
                ],
                [
                    "title" => "Upload",
                    "desc" => "enviar",
                    "icon" => "upload"
                ],
                [
                    "title" => "Cloud",
                    "desc" => "nuvem",
                    "icon" => "cloud"
                ],
                [
                    "title" => "Imagem",
                    "desc" => "galeria",
                    "icon" => "image"
                ],
                [
                    "title" => "Feedback",
                    "desc" => "avaliação",
                    "icon" => "message-circle"
                ]
            ]
        ]);
    }
}