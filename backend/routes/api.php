<?php

use Illuminate\Support\Facades\Route;

Route::get('/home', function () {
    return response()->json([
        "message" => "API funcionando 🚀",
        "cards" => [
            ["title" => "Cursos", "desc" => "Aprenda novas habilidades"],
            ["title" => "Projetos", "desc" => "Pratique com desafios reais"],
            ["title" => "Comunidade", "desc" => "Conecte-se com pessoas"]
        ]
    ]);
});