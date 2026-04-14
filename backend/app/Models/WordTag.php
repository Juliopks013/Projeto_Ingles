<?php
    use Illuminate\Database\Eloquent\Model;

    class WordTag extends Model
    {
        protected $table = 'words_tags';

        public $timestamps = false; // geralmente pivot não usa timestamps

        protected $fillable = [
            'word_id',
            'tag_id'
        ];
    }
