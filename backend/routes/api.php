<?php
use Illuminate\Support\Facades\Route;

Route::get('/home', function () {
    return response()->json([
        "message" => "API funcionando",
        "cards" => [
            [
                "title" => "Cursos",
                "desc" => "Aprenda novas habilidades",
                "icon" => "book"
            ],
            [
                "title" => "Projetos",
                "desc" => "Pratique com desafios reais",
                "icon" => "code"
            ],
            [
                "title" => "Comunidade",
                "desc" => "Conecte-se com pessoas",
                "icon" => "users"
            ],
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
});