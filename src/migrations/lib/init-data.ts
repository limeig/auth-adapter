export const categories = [
    {
      id: 'category_stem',
      name: 'STEM',
      description: 'exact sciences: Mathematics and etc',
    },
    {
      id: 'category_art',
      name: 'Art',
      description: 'Painting, playing music',
    },
    {
      id: 'category_humanities',
      name: 'Humanities',
      description:
        'The humanities include the studies of philosophy, religion, history, language arts (literature, writing, oratory, rhetoric, poetry, etc.)',
    },
    {
      id: 'category_sport',
      name: 'Sport',
      description: 'Sport activities',
    },
    {
      id: 'category_hobbies',
      name: 'Hobbies',
      description: 'Car modelling, Playing computer games, any hobbies',
    },
    {
      id: 'category_different',
      name: 'Different',
      description: 'If you can`t find right category place it here',
    },
    {
      id: 'category_informational_technologies',
      name: 'Informational technologies',
      description: 'Programming and other computing skills',
    },
    {
      id: 'category_languages',
      name: 'Languages',
      description: 'English, French, Japanese ant etc',
    },
    {
      id: 'category_natural_science',
      name: 'Natural science',
      description: 'Science about life, about surrounding, about planenets, about universary',
    },
    {
      id: 'category_home_duties',
      name: 'Home duties',
      description: 'Helping your parents is important thing. They do so much for you. Help them a little bit.',
    },
  ];
  
  export const subjects = [
    {
      id: 'subject_mathematics',
      category: ['category_stem'],
      name: 'Mathematics',
      description: 'Numbers, arithmetics',
    },
    {
      id: 'subject_biology',
      category: ['category_natural_science', 'category_stem'],
      name: 'Biology',
      description: 'Animals and other life enities',
    },
    {
      id: 'subject_basketball',
      category: ['category_sport', 'category_hobbies'],
      name: 'Basketball',
      description: 'throw ball up',
    },
    {
      id: 'subject_bicycle',
      category: ['category_sport', 'category_hobbies'],
      name: 'Bicycle',
      description: 'Keep pedaling',
    },
    {
      id: 'subject_english',
      category: ['category_humanities', 'category_languages'],
      name: 'English',
      description: 'The main international language',
    },
    {
      id: 'subject_programming',
      category: ['category_exact_sciences', 'category_informational_technologies'],
      name: 'Programming',
      description: 'C++, Java, Python and etc',
    },
    {
      id: 'subject_chemistry',
      category: ['category_exact_sciences'],
      name: 'Chemistry',
      description: 'H2O and other interesting formulas',
    },
    {
      id: 'subject_astronomy',
      category: ['category_natural_science'],
      name: 'exact sciences',
      description: 'If you see stars, you will be the star',
    },
    {
      id: 'subject_french',
      category: ['category_humanities', 'category_languages'],
      name: 'French',
      description: 'la Paris',
    },
    {
      id: 'subject_japanese',
      category: ['category_humanities', 'category_languages'],
      name: 'Japanese',
      description: 'Do you know katakana?',
    },
    {
      id: 'subject_spainish',
      category: ['category_humanities', 'category_languages'],
      name: 'Spainish',
      description: 'Mathematics and etc',
    },
    {
      id: 'subject_mandarin_chinese',
      category: ['category_humanities', 'category_languages'],
      name: 'Mandarin Chinese',
      description: 'The biggest language by number of native speakers',
    },
    {
      id: 'subject_hebrew',
      category: ['category_humanities', 'category_languages'],
      name: 'Hebrew',
      description: 'One of the anciest languges in the world. Shalom.',
    },
    {
      id: 'subject_geography',
      category: ['category_humanities', 'category_natural_science'],
      name: 'Geography',
      description: 'With this subject you will able to navigate yourself using maps, even paper one.',
    },
    {
      id: 'subject_hindi',
      category: ['category_humanities', 'category_languages'],
      name: 'Hindi',
      description: 'Some rare language',
    },
    {
      id: 'subject_russian',
      category: ['category_humanities', 'category_languages'],
      name: 'Russian',
      description: 'Russia the biggest country in the world.',
    },
    {
      id: 'subject_arabic',
      category: ['category_humanities', 'category_languages'],
      name: 'Arabic',
      description: 'Arabian night...',
    },
    {
      id: 'subject_running',
      category: ['category_sport'],
      name: 'Running',
      description: 'Run faster, be happy',
    },
    {
      id: 'subject_german',
      category: ['category_humanities', 'category_languages'],
      name: 'German',
      description: 'Germany language',
    },
    {
      id: 'subject_typing',
      category: ['category_informational_technologies'],
      name: 'Typing',
      description: 'Type text is important thing today',
    },
    {
      id: 'subject_car_modelling',
      category: ['category_hobbies'],
      name: 'Car modelling',
      description: 'You can build a car by yourself!',
    },
    {
      id: 'subject_literature',
      category: ['category_humanities'],
      name: 'Literature',
      description: 'You can read books as a homework. I envy you.',
    },
    {
      id: 'subject_washing_dishes',
      category: ['category_home_duties'],
      name: 'Washing dishes',
      description: 'Type text is important thing today',
    },
    {
      id: 'subject_artificial_intelligence',
      category: ['category_informational_technologies'],
      name: 'Artificial intelligence',
      description: 'Create a new mind',
    },
    {
      id: 'subject_economics',
      category: ['category_natural_science'],
      name: 'Economics',
      description: 'Understand how money work and earn a lot of them',
    },
    {
      id: 'subject_walk_the_dog',
      category: ['category_home_duties'],
      name: 'Walk the dog',
      description: 'Care about pets is important skill',
    },
    {
      id: 'subject_reading_aloud',
      category: ['category_humanities'],
      name: 'Reading aloud',
      description: 'Read aloud and everybody will hear your clearly',
    },
    {
      id: 'subject_reading',
      category: ['category_humanities', 'category_hobbies'],
      name: 'Reading',
      description: 'Read books a become smarter. Some time ago it will turn you into a rich man',
    },
    {
      id: 'subject_storytelling',
      category: ['category_humanities'],
      name: 'Storytelling',
      description: 'Tell me a story today. Make a film tomorrow. ',
    },
    {
      id: 'subject_painting',
      category: ['category_art'],
      name: 'Painting',
      description: 'It is so beautifull',
    },
    {
      id: 'subject_playing_piano',
      category: ['category_art', 'category_music'],
      name: 'Playing piano',
      description:
        'I hope you don`t live in an apartment building. Sorry it is just a joke. In fact, your piano playing is so beautiful.',
    },
  ];
