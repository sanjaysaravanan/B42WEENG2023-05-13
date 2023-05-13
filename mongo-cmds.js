// aggreagation

db.todos.aggregate([
  {
    $match: { userId: 1 }
  },
  { $count: 'userId -> 1 todos' }
]);

// find the maximum mark scored by any student
db.students.aggregate([
  {
    $group: {
      _id: '',
      maxMark: {
        $max: '$marks'
      }
    }
  }
]);

// find the minimum mark scored 
db.students.aggregate([
  {
    $group: {
      _id: '',
      minMark: {
        $min: '$marks'
      }
    }
  }
]);


// find the avg marks of all records
db.students.aggregate([
  {
    $group: {
      _id: '',
      avgMark: {
        $avg: '$marks'
      }
    }
  }
]);


// 1. find the avg marks of all records for each student

db.students.aggregate([
  {
    $group: {
      _id: '$name',
      avgMark: {
        $avg: '$marks'
      }
    }
  }
]);


// 2. find the maximum mark scored for each student
db.students.aggregate([
  {
    $group: {
      _id: '$name',
      maxMark: {
        $max: '$marks'
      }
    }
  }
]);



// 3. find the minimum mark scored for each student
db.students.aggregate([
  {
    $group: {
      _id: '$name',
      minMark: {
        $min: '$marks'
      }
    }
  }
]);


// grouping with projection
db.students.aggregate([
  {
    $group: {
      _id: '$name',
      avgMark: {
        $avg: '$marks'
      }
    }
  },
  {
    $project: {
      _id: 0,
      name: '$_id',
      avgMark: 1
    }
  }
]);


// Q1: find the number of todos per userid
// group by then count aggregation // use projection if needed

db.todos.aggregate([
  { "$group": { _id: "$userId", todosCount: { $sum: 1 } } }
]);


// Q2: find the total marks for the students

db.students.aggregate([
  { "$group": { _id: "$name", totalMarks: { $sum: '$marks' } } }
]);

// Q3: find the avg/percent of each students

db.students.aggregate([
  { "$group": { _id: "$name", avgMarks: { $avg: '$marks' } } }
]);

// Q4: find all the qty which is urgent

// simple query with find
db.products.find({ status: 'urgent' });

// same with aggregate
db.items.aggregate([
  { '$match': { status: 'urgent' } } // $match: < query object >
]);

//  Q5: find total urgent qty for each items

// same with aggregate
db.items.aggregate([
  { '$match': { status: 'urgent' } }, // $match: < query object >
  {
    '$group': {
      _id: '$product',
      totalQty: {
        $sum: '$qty'
      }
    }
  },
  {
    '$project': {
      _id: 0,
      product: '$_id',
      totalQty: 1
    }
  }
]);
