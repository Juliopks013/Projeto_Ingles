<?php
    use Illuminate\Database\Eloquent\Model;

    class Word extends Model
    {
        protected $fillable = [
            'word_en',
            'word_pt',
            'description',
            'audio',
            'category_id'
        ];

        public function category()
        {
            return $this->belongsTo(Category::class);
        }

        public function tags()
        {
            return $this->belongsToMany(Tag::class, 'words_tags');
        }
    }
