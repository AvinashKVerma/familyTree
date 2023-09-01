const data = [
  {
    id: '1693296297863',
    name: 'Prince Andrew',
    gender: 'male',
    img: 'f11',
    mid: '1693296297869',
    fid: '1693296297856',
    title: 'Duke of York',
    spouse: null,
    display: true,
  },
  {
    id: '1693296297865',
    name: 'Prince George',
    gender: 'male',
    img: 'f17',
    mid: '1693296288314',
    fid: '1693296297872',
    title: null,
    spouse: null,
    display: true,
  },
  {
    id: '1693296297867',
    name: 'Prince Louise',
    gender: 'male',
    img: 'f19',
    mid: '1693296288314',
    fid: '1693296297872',
    title: null,
    spouse: null,
    display: true,
  },
  {
    id: '1693296297864',
    name: 'Anne',
    gender: 'female',
    img: 'f10',
    mid: '1693296297869',
    fid: '1693296297856',
    title: 'Princess Royal',
    spouse: '{"1693303827059"}',
    display: true,
  },
  {
    id: '1693296297872',
    name: 'Prince William',
    gender: 'male',
    img: 'f14',
    mid: '1693296297859',
    fid: '1693296297870',
    title: 'Duch of Cambridge',
    spouse: '{"1693296288314","1693303793058"}',
    display: true,
  },
  {
    id: '1693296288314',
    name: 'Catherine',
    gender: 'female',
    img: 'f13',
    mid: null,
    fid: null,
    title: 'Duchess of Cambridge',
    spouse: null,
    display: true,
  },
  {
    id: '1693305353965',
    name: 'Jammy',
    gender: 'male',
    img: 'jhbweh',
    mid: null,
    fid: null,
    title: 'Master Chef',
    spouse: '1693296297866',
    display: true,
  },
  {
    id: '1693296297866',
    name: 'Princess Charlotte',
    gender: 'female',
    img: 'f18',
    mid: '1693296288314',
    fid: '1693296297872',
    title: null,
    spouse: '{"1693305353965"}',
    display: true,
  },
  {
    id: '1693305381596',
    name: 'Buddy',
    gender: 'female',
    img: 'qwhbe',
    mid: '1693296297866',
    fid: '1693305353965',
    title: 'deh',
    spouse: null,
    display: false,
  },
  {
    id: '1693296297870',
    name: 'Charles',
    gender: 'male',
    img: 'f8',
    mid: '1693296297869',
    fid: '1693296297856',
    title: 'Prince of Wales',
    spouse: '{1693296297858,1693296297859}',
    display: true,
  },
  {
    id: '1693370203034',
    name: 'erge',
    gender: 'male',
    img: '34r3',
    mid: '1693296297866',
    fid: '1693305353965',
    title: '24r3',
    spouse: null,
    display: true,
  },
  {
    id: '1693370355598',
    name: '4t5rtg',
    gender: 'female',
    img: '545y4',
    mid: null,
    fid: null,
    title: '45t45',
    spouse: '1693296297862',
    display: true,
  },
  {
    id: '1693296297862',
    name: 'Prince Edward',
    gender: 'male',
    img: 'f12',
    mid: '1693296297869',
    fid: '1693296297856',
    title: 'Earl of Wessex',
    spouse: '{"1693370355598"}',
    display: true,
  },
  {
    id: '1693296295215',
    name: 'Queen Elizabeth',
    gender: 'female',
    img: 'f2',
    mid: null,
    fid: null,
    title: 'The Queen Mother',
    spouse: null,
    display: true,
  },
  {
    id: '1693296297856',
    name: 'Prince Philip',
    gender: 'male',
    img: 'f3',
    mid: null,
    fid: null,
    title: 'Duke of Edinburgh',
    spouse: null,
    display: true,
  },
  {
    id: '1693296297857',
    name: 'Meghan Markle',
    gender: 'female',
    img: 'f16',
    mid: null,
    fid: null,
    title: null,
    spouse: null,
    display: true,
  },
  {
    id: '1693296297858',
    name: 'Camila',
    gender: 'female',
    img: 'f7',
    mid: null,
    fid: null,
    title: 'Duchess of Cornwall',
    spouse: null,
    display: true,
  },
  {
    id: '1693296297859',
    name: 'Diana',
    gender: 'female',
    img: 'f9',
    mid: null,
    fid: null,
    title: 'Princess of Wales',
    spouse: null,
    display: true,
  },
  {
    id: '1693296297868',
    name: 'King George VI',
    gender: 'male',
    img: 'f1',
    mid: null,
    fid: null,
    title: 'God',
    spouse: '{"1693296295215"}',
    display: true,
  },
  {
    id: '1693296297860',
    name: 'Princess Margaret',
    gender: 'female',
    img: 'f6',
    mid: '1693296295215',
    fid: '1693296297868',
    title: null,
    spouse: null,
    display: true,
  },
  {
    id: '1693296297869',
    name: 'Queen Elizabeth II',
    gender: 'female',
    img: 'f5',
    mid: '1693296295215',
    fid: '1693296297868',
    title: null,
    spouse: '{1693296297856}',
    display: true,
  },
  {
    id: '1693296297871',
    name: 'Prince Harry',
    gender: 'male',
    img: 'f15',
    mid: '1693296297859',
    fid: '1693296297870',
    title: null,
    spouse: '{1693296297857}',
    display: true,
  },
];

const id = 1693296297868;

const person_dict = {};

data.forEach((entry) => {
  const wifee = []; // Renamed to a more appropriate name

  data.forEach((potentialSpouse) => {
    if (entry.spouse && entry.spouse.includes(potentialSpouse.id)) {
      wifee.push(potentialSpouse);
    }
  });

  const person = {
    id: entry.id,
    name: entry.name,
    gender: entry.gender,
    spouse: [...wifee],
    img: entry.img,
    title: entry.title,
    children: [],
    mid: entry.mid,
    fid: entry.fid,
    display: entry.display,
  };
  person_dict[person.id] = person;
});

data.forEach((entry) => {
  const person = person_dict[entry.id];
  if (entry.mid) {
    const mother = person_dict[entry.mid];
    if (entry.fid) {
      const father = person_dict[entry.fid];
      if (father) {
        father.children.push(person);
      }
    }
    if (mother) {
      mother.children.push(person);
    }
  }
});

console.log(person_dict[1693296297868]);
export default person_dict[1693296297868];
