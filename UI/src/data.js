// export default function build_family_tree(data, rootId) {
//   console.log(JSON.stringify(data));
//   const persons = {};

//   data.forEach((entry) => {
//     persons[entry.id] = {
//       ...entry,
//       spouse: [],
//       children: [],
//     };
//   });

//   data.forEach((entry) => {
//     if (Array.isArray(entry.spouse)) {
//       persons[entry.id].spouse = entry.spouse.map((id) => persons[id]).filter(Boolean);
//     }
//   });

//   data.forEach((entry) => {
//     if (entry.mid && persons[entry.mid]) {
//       persons[entry.mid].children.push(persons[entry.id]);
//     }

//     if (entry.fid && persons[entry.fid] && entry.fid !== entry.mid) {
//       persons[entry.fid].children.push(persons[entry.id]);
//     }
//   });

//   return persons[rootId];
// }

export default function build_family_tree(data, rootId) {
  const persons = {};

  // Create person dictionary
  data.forEach((entry) => {
    persons[entry.id] = {
      ...entry,
      spouse: [],
      children: [],
      isBloodMember: entry.id === rootId || Boolean(entry.mid) || Boolean(entry.fid),
    };
  });

  // Attach spouses only to blood members
  data.forEach((entry) => {
    const person = persons[entry.id];

    if (person.isBloodMember && Array.isArray(entry.spouse)) {
      person.spouse = entry.spouse
        .map((id) => persons[id])
        .filter(Boolean)
        .map((spouse) => ({
          id: spouse.id,
          name: spouse.name,
          img: spouse.img,
          gender: spouse.gender,
          title: spouse.title,
          display: spouse.display,
          spouse: [], // prevent spouse recursion
          children: [],
        }));
    }
  });

  // Build children relationships
  data.forEach((entry) => {
    const child = persons[entry.id];

    if (entry.mid && persons[entry.mid]) {
      persons[entry.mid].children.push(child);
    }

    if (entry.fid && persons[entry.fid] && entry.fid !== entry.mid) {
      persons[entry.fid].children.push(child);
    }
  });

  return persons[rootId];
}
