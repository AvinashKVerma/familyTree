function build_family_tree(data, id) {
  const person_dict = {};

  data.forEach((entry) => {
    const wife = entry.spouse ? entry.spouse : [];
    const wifee = [];

    for (const entry of data) {
      if (wife.includes(entry.id)) {
        wifee.push(entry);
      }
    }

    const person = {
      id: entry.id,
      name: entry.name,
      gender: entry.gender,
      spouse: [...wifee],
      img: [entry.img],
      title: entry.title,
      children: [],
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
  const rootPerson = person_dict[id];
  return rootPerson;
}

export default build_family_tree;
