<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\WordController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;

Route::get('/home', function () {
        return response()->json([
            "message" => "API funcionando",
        
            "cards" => [
                [
                    "icon" => "grid",
                    "word" => "Array",
                    "pronunciation" => "ah-rêi",
                    "translation" => "Variedade/Vetor",
                    "desc" => "Conjunto de dados organizados em uma lista.",
                ],
                [
                    "icon" => "hash",
                    "word" => "Binary",
                    "pronunciation" => "bái-nê-ri",
                    "translation" => "Binário",
                    "desc" => "Sistema numérico de 0 e 1 usado por computadores.",
                ],
                [
                    "icon" => "cloud",
                    "word" => "Cloud",
                    "pronunciation" => "clá-ud",
                    "translation" => "Nuvem",
                    "desc" => "Serviços e armazenamento via internet.",
                ],
                [
                    "icon" => "database",
                    "word" => "Data",
                    "pronunciation" => "dêi-ta",
                    "translation" => "Dados",
                    "desc" => "Informação que pode ser processada ou analisada.",
                ],
                [
                    "icon" => "lock",
                    "word" => "Encryption",
                    "pronunciation" => "en-críp-shun",
                    "translation" => "Criptografia",
                    "desc" => "Transformar dados em códigos para segurança.",
                ],
                [
                    "icon" => "code",
                    "word" => "Function",
                    "pronunciation" => "fân-k-shun",
                    "translation" => "Função",
                    "desc" => "Conjunto de instruções para uma tarefa específica.",
                ],
                [
                    "icon" => "bar-chart-2",
                    "word" => "Graph",
                    "pronunciation" => "græf (gréf)",
                    "translation" => "Gráfico",
                    "desc" => "Representação visual de dados ou relações.",
                ],
                [
                    "icon" => "globe",
                    "word" => "HTML",
                    "pronunciation" => "êitch-tê-em-él",
                    "translation" => "HTML",
                    "desc" => "Linguagem de marcação para estrutura de sites.",
                ],
                [
                    "icon" => "layers",
                    "word" => "Interface",
                    "pronunciation" => "ín-ter-fêice",
                    "translation" => "Interface",
                    "desc" => "Meio de comunicação entre usuário e sistema.",
                ],
                [
                    "icon" => "codepen",
                    "word" => "JavaScript",
                    "pronunciation" => "djá-va-scrípt",
                    "translation" => "JavaScript",
                    "desc" => "Linguagem para interatividade em páginas web.",
                ],
                [
                    "icon" => "key",
                    "word" => "Key",
                    "pronunciation" => "kí",
                    "translation" => "Chave",
                    "desc" => "Identificador ou código de segurança.",
                ],
                [
                    "icon" => "repeat",
                    "word" => "Loop",
                    "pronunciation" => "lúp",
                    "translation" => "Laço",
                    "desc" => "Repetição de instruções até uma condição.",
                ],
                [
                    "icon" => "cpu",
                    "word" => "Memory",
                    "pronunciation" => "mé-mo-ri",
                    "translation" => "Memória",
                    "desc" => "Espaço temporário para dados em execução.",
                ],
                [
                    "icon" => "server",
                    "word" => "Node.js",
                    "pronunciation" => "nôud-djê-és",
                    "translation" => "Node.js",
                    "desc" => "Plataforma para rodar JS no servidor.",
                ],
                [
                    "icon" => "box",
                    "word" => "Object",
                    "pronunciation" => "ób-djékt",
                    "translation" => "Objeto",
                    "desc" => "Estrutura que agrupa dados e funções.",
                ],
                [
                    "icon" => "share-2",
                    "word" => "Protocol",
                    "pronunciation" => "prô-to-cól",
                    "translation" => "Protocolo",
                    "desc" => "Regras para comunicação entre sistemas.",
                ],
                [
                    "icon" => "search",
                    "word" => "Query",
                    "pronunciation" => "cuí-ri",
                    "translation" => "Consulta",
                    "desc" => "Pedido de informação a um banco de dados.",
                ],
                [
                    "icon" => "wifi",
                    "word" => "Router",
                    "pronunciation" => "ráu-ter",
                    "translation" => "Roteador",
                    "desc" => "Dispositivo que direciona dados na rede.",
                ],
                [
                    "icon" => "server",
                    "word" => "Server",
                    "pronunciation" => "sér-ver",
                    "translation" => "Servidor",
                    "desc" => "Computador que fornece serviços a clientes.",
                ],
                [
                    "icon" => "git-branch",
                    "word" => "Thread",
                    "pronunciation" => "thrédi",
                    "translation" => "Thread",
                    "desc" => "Linha de execução de tarefas simultâneas.",
                ],
                [
                    "icon" => "link",
                    "word" => "URL",
                    "pronunciation" => "iu-ár-él",
                    "translation" => "URL",
                    "desc" => "Endereço de um recurso na internet.",
                ],
                [
                    "icon" => "activity",
                    "word" => "Variable",
                    "pronunciation" => "vê-ri-ah-bou",
                    "translation" => "Variável",
                    "desc" => "Espaço para guardar dados que podem mudar.",
                ],
                [
                    "icon" => "layout",
                    "word" => "Widget",
                    "pronunciation" => "uí-djét",
                    "translation" => "Widget",
                    "desc" => "Pequeno elemento de interface (ex: botões).",
                ],
                [
                    "icon" => "file-text",
                    "word" => "XML",
                    "pronunciation" => "équis-em-él",
                    "translation" => "XML",
                    "desc" => "Linguagem para organizar dados estruturados.",
                ],
                [
                    "icon" => "settings",
                    "word" => "YAML",
                    "pronunciation" => "iá-mel",
                    "translation" => "YAML",
                    "desc" => "Formato de configuração legível por humanos.",
                ],
                [
                    "icon" => "archive",
                    "word" => "Zip",
                    "pronunciation" => "zíp",
                    "translation" => "Zip/Compactar",
                    "desc" => "Formato que reduz o tamanho de arquivos.",
                ]
            ]
        ]);
});

Route::apiResource('words', WordController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('tags', TagController::class);

Route::get('/admin', [AdminController::class, 'index']);