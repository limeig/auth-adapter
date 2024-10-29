export const categories = [
    {
      id: 'stem',
      name: 'STEM',
      description: 'exact sciences: Mathematics and etc',
    },
    {
      id: 'art',
      name: 'Art',
      description: 'Painting, playing music',
    },
    {
      id: 'humanities',
      name: 'Humanities',
      description:
        'The humanities include the studies of philosophy, religion, history, language arts (literature, writing, oratory, rhetoric, poetry, etc.)',
    },
    {
      id: 'sport',
      name: 'Sport',
      description: 'Sport activities',
    },
    {
      id: 'hobbies',
      name: 'Hobbies',
      description: 'Car modelling, Playing computer games, any hobbies',
    },
    {
      id: 'different',
      name: 'Different',
      description: 'If you can`t find right category place it here',
    },
    {
      id: 'informational_technologies',
      name: 'Informational technologies',
      description: 'Programming and other computing skills',
    },
    {
      id: 'languages',
      name: 'Languages',
      description: 'English, French, Japanese ant etc',
    },
    {
      id: 'natural_science',
      name: 'Natural science',
      description: 'Science about life, about surrounding, about planenets, about universary',
    },
    {
      id: 'home_duties',
      name: 'Home duties',
      description: 'Helping your parents is important thing. They do so much for you. Help them a little bit.',
    },
  ];
  
  export const subjects = [
    {
      id: 'mathematics',
      category: ['stem'],
      name: 'Mathematics',
      description: 'Numbers, arithmetics',
    },
    {
      id: 'biology',
      category: ['natural_science', 'stem'],
      name: 'Biology',
      description: 'Animals and other life enities',
    },
    {
      id: 'basketball',
      category: ['sport', 'hobbies'],
      name: 'Basketball',
      description: 'throw ball up',
    },
    {
      id: 'bicycle',
      category: ['sport', 'hobbies'],
      name: 'Bicycle',
      description: 'Keep pedaling',
    },
    {
      id: 'english',
      category: ['humanities', 'languages'],
      name: 'English',
      description: 'The main international language',
    },
    {
      id: 'programming',
      category: ['exact_sciences', 'informational_technologies'],
      name: 'Programming',
      description: 'C++, Java, Python and etc',
    },
    {
      id: 'chemistry',
      category: ['exact_sciences'],
      name: 'Chemistry',
      description: 'H2O and other interesting formulas',
    },
    {
      id: 'astronomy',
      category: ['natural_science'],
      name: 'exact sciences',
      description: 'If you see stars, you will be the star',
    },
    {
      id: 'french',
      category: ['humanities', 'languages'],
      name: 'French',
      description: 'la Paris',
    },
    {
      id: 'japanese',
      category: ['humanities', 'languages'],
      name: 'Japanese',
      description: 'Do you know katakana?',
    },
    {
      id: 'spainish',
      category: ['humanities', 'languages'],
      name: 'Spainish',
      description: 'Mathematics and etc',
    },
    {
      id: 'mandarin_chinese',
      category: ['humanities', 'languages'],
      name: 'Mandarin Chinese',
      description: 'The biggest language by number of native speakers',
    },
    {
      id: 'hebrew',
      category: ['humanities', 'languages'],
      name: 'Hebrew',
      description: 'One of the anciest languges in the world. Shalom.',
    },
    {
      id: 'geography',
      category: ['humanities', 'natural_science'],
      name: 'Geography',
      description: 'With this subject you will able to navigate yourself using maps, even paper one.',
    },
    {
      id: 'hindi',
      category: ['humanities', 'languages'],
      name: 'Hindi',
      description: 'Some rare language',
    },
    {
      id: 'russian',
      category: ['humanities', 'languages'],
      name: 'Russian',
      description: 'Russia the biggest country in the world.',
    },
    {
      id: 'arabic',
      category: ['humanities', 'languages'],
      name: 'Arabic',
      description: 'Arabian night...',
    },
    {
      id: 'running',
      category: ['sport'],
      name: 'Running',
      description: 'Run faster, be happy',
    },
    {
      id: 'german',
      category: ['humanities', 'languages'],
      name: 'German',
      description: 'Germany language',
    },
    {
      id: 'typing',
      category: ['informational_technologies'],
      name: 'Typing',
      description: 'Type text is important thing today',
    },
    {
      id: 'car_modelling',
      category: ['hobbies'],
      name: 'Car modelling',
      description: 'You can build a car by yourself!',
    },
    {
      id: 'literature',
      category: ['humanities'],
      name: 'Literature',
      description: 'You can read books as a homework. I envy you.',
    },
    {
      id: 'washing_dishes',
      category: ['home_duties'],
      name: 'Washing dishes',
      description: 'Type text is important thing today',
    },
    {
      id: 'artificial_intelligence',
      category: ['informational_technologies'],
      name: 'Artificial intelligence',
      description: 'Create a new mind',
    },
    {
      id: 'economics',
      category: ['natural_science'],
      name: 'Economics',
      description: 'Understand how money work and earn a lot of them',
    },
    {
      id: 'walk_the_dog',
      category: ['home_duties'],
      name: 'Walk the dog',
      description: 'Care about pets is important skill',
    },
    {
      id: 'reading_aloud',
      category: ['humanities'],
      name: 'Reading aloud',
      description: 'Read aloud and everybody will hear your clearly',
    },
    {
      id: 'reading',
      category: ['humanities', 'hobbies'],
      name: 'Reading',
      description: 'Read books a become smarter. Some time ago it will turn you into a rich man',
    },
    {
      id: 'storytelling',
      category: ['humanities'],
      name: 'Storytelling',
      description: 'Tell me a story today. Make a film tomorrow. ',
    },
    {
      id: 'painting',
      category: ['art'],
      name: 'Painting',
      description: 'It is so beautifull',
    },
    {
      id: 'playing_piano',
      category: ['art', 'music'],
      name: 'Playing piano',
      description:
        'I hope you don`t live in an apartment building. Sorry it is just a joke. In fact, your piano playing is so beautiful.',
    },
  ];

  export const criteria = [ 
    { 
      id: 'completion', 
      name: 'Completion of assignments', 
      description: 'Demonstrating consistency in finishing tasks according to given instructions and timelines, showcasing commitment to the learning process and responsibility in meeting academic requirements.',
      1: 'Child often fails to complete assigned tasks or submits incomplete work.',
      2: 'Child completes assignments inconsistently and may require reminders to finish tasks on time.',
      3: 'Child completes most assigned tasks but occasionally misses deadlines or overlooks specific requirements.',
      4: 'Child consistently submits completed assignments on time and meets all outlined requirements.', 
      5: 'Child demonstrates a high level of commitment to completing assignments with accuracy and attention to detail.', 
      6: 'Child goes above and beyond in completing assignments, showcasing exceptional effort, creativity, and thoroughness in the work submitted.'
    }, 
    { 
      id: 'understanding', 
      name: 'Understanding of concepts', 
      description: 'Grasping the fundamental ideas and principles conveyed in the subject matter, showing comprehension and practical application of acquired knowledge beyond mere memorization.',
      1: 'Child struggles to grasp basic concepts and frequently requires additional explanations.',
      2: 'Child demonstrates a limited understanding of fundamental concepts and may need extra guidance to comprehend complex topics.',
      3: 'Child shows a satisfactory understanding of most concepts but may have difficulty applying them independently.',
      4: 'Child displays a solid grasp of key concepts and can effectively apply them to solve problems or analyze situations.',
      5: 'Child exhibits a deep understanding of complex concepts and demonstrates the ability to synthesize information to form insightful connections.',
      6: 'Child showcases mastery of concepts, displaying a nuanced understanding and the capability to explain, analyze, and critically evaluate concepts with depth and clarity.'
    },
    { 
      id: 'participation', 
      name: 'Participation', 
      description: 'Actively engaging in the lesson by offering insights, asking thoughtful questions, and actively participating in discussions to enhance learning. Participation entails a willingness to collaborate with the parent, contribute ideas, and demonstrate a keen interest in the subject matter being taught during homeschooling sessions.',
      1: 'Child is consistently disengaged and seldom contributes during lessons.',
      2: 'Child participates minimally, offering brief responses and showing reluctance to engage in discussions.',
      3: 'Child engages in discussions but may need encouragement to actively contribute ideas or ask questions.',
      4: 'Child actively participates in lessons, shares insights, asks relevant questions, and collaborates effectively with the parent.',
      5: 'Child consistently participates in discussions, demonstrates critical thinking, and contributes thoughtfully to enhance the learning experience.',
      6: 'Child takes a leadership role in discussions, offers original perspectives, asks probing questions, and fosters a dynamic learning environment through active engagement.'
    },
    { 
      id: 'concentration', 
      name: 'Concentration', 
      description: 'Refers to the ability of a child to maintain focus and attention on tasks or lessons. This criterion evaluates how well the child can engage with the material, resist distractions, and sustain effort over time. A child’s level of concentration can significantly impact their learning outcomes, productivity, and overall engagement.',
      1: 'Child frequently became distracted during lessons, often looking around the room or playing with toys instead of focusing on the task at hand. They needed regular redirection to stay on topic.',
      2: 'Child showed some ability to concentrate but often needed prompts to remain focused. They could complete short tasks but would lose interest in longer activities and start daydreaming or fidgeting.',
      3: 'Child was able to concentrate on tasks for moderate periods, typically completing short assignments with minimal distractions. However, during group activities, they sometimes struggled to maintain focus if peers were talking or moving around.',
      4: 'Child demonstrated good concentration during individual tasks, often working diligently without needing reminders. They were able to engage in discussions and follow along with lessons, although they occasionally became distracted by external noises.',
      5: 'Child maintained strong concentration skills, often diving deeply into assignments and displaying a clear focus on the material. They managed to tune out distractions from siblings or background noise, allowing them to work independently for extended periods.',
      6: 'Child exhibited exceptional concentration, able to focus intensely on complex tasks or projects for long stretches without losing track of their objectives. They utilized techniques such as time-blocking to enhance their focus and frequently sought out quiet spaces to maximize productivity.',
    },
    { 
      id: 'self_motivation', 
      name: 'Self motivation and independence', 
      description: "This criterion evaluates the child's ability to take ownership of their learning, actively seek out additional resources, set personal goals, and exhibit a proactive approach to mastering the material in a homeschooling setting.",
      1: 'Child waits for constant guidance and reminders to complete tasks, showing no initiative.',
      2: 'Child attempts tasks but frequently seeks help and lacks a proactive approach.',
      3: 'Child shows some independence but often relies on parental guidance to stay on task.',
      4: 'Child takes initiative to start assignments but occasionally needs reminders to stay focused.',
      5: 'Child demonstrates strong independence, completing tasks with minimal supervision.',
      6: 'Child consistently shows high self-motivation, setting personal goals and exploring additional resources without prompting.'
    },
    { 
      id: 'communication', 
      name: 'Communication', 
      description: 'Effectively conveying ideas, thoughts, and information clearly through verbal, written, or non-verbal means, listening actively, showcasing strong interpersonal skills in expressing thoughts and engaging in discussions.',
      1: 'Child struggles to express ideas clearly, often lacking coherence in verbal or written communication.',
      2: 'Child communicates basic ideas but may have difficulty articulating thoughts or expressing concepts in a cohesive manner.',
      3: 'Child demonstrates adequate communication skills, effectively conveying thoughts and ideas with moderate clarity and coherence.',
      4: 'Child exhibits strong communication skills, articulating thoughts clearly, engaging in effective dialogue, and expressing ideas with confidence.',
      5: 'Child communicates with precision and eloquence, engaging in compelling discussions, and conveying complex ideas fluently and persuasively.',
      6: 'Child showcases exceptional communication proficiency, demonstrating mastery in conveying ideas concisely, articulately, and persuasively across various mediums with poise and sophistication.'
    },
  ]; 
 
