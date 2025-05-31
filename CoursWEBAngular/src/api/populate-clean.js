const mongoose = require('mongoose');
const Assignment = require('./model/assignment');
const assignmentsData = require('./data.json');

const uri = 'mongodb+srv://yassyisola:Eg7Pf4e3E95XKVr5@cluster0.o7jvq.mongodb.net/assignmentsDB?retryWrites=true&w=majority&appName=Cluster0';

// Fonction pour nettoyer les dates MongoDB
function cleanDates(data) {
  return data.map(assignment => {
    const cleaned = { ...assignment };
    
    // Nettoyer dueDate
    if (cleaned.dueDate && typeof cleaned.dueDate === 'object' && cleaned.dueDate.$date) {
      cleaned.dueDate = new Date(cleaned.dueDate.$date);
    }
    
    // Nettoyer postedOn
    if (cleaned.postedOn && typeof cleaned.postedOn === 'object' && cleaned.postedOn.$date) {
      cleaned.postedOn = new Date(cleaned.postedOn.$date);
    }
    
    // Nettoyer submittedOn
    if (cleaned.submittedOn && typeof cleaned.submittedOn === 'object' && cleaned.submittedOn.$date) {
      cleaned.submittedOn = new Date(cleaned.submittedOn.$date);
    }
    
    return cleaned;
  });
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Nettoyer les anciennes données
    console.log('Clearing existing assignments...');
    await Assignment.deleteMany({});
    console.log('Database cleared!');
    
    // Nettoyer les dates
    console.log('Cleaning date formats...');
    const cleanedAssignments = cleanDates(assignmentsData);
    
    // Insérer les nouvelles données
    console.log('Inserting new assignments...');
    await Assignment.insertMany(cleanedAssignments);
    console.log(`${cleanedAssignments.length} assignments inserted successfully!`);
    
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.disconnect();
  }); 