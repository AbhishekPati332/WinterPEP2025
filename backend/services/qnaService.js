const Hospital = require('../models/Hospital');

// Function to get context from the database
const getContext = async () => {
  try {
    const hospitals = await Hospital.find({});
    return hospitals.map(hospital => ({
      name: hospital.name,
      city: hospital.city,
      specialities: hospital.specialities.join(', '),
      description: hospital.description,
      numberOfDoctors: hospital.numberOfDoctors,
      numberOfDepartments: hospital.numberOfDepartments
    }));
  } catch (error) {
    console.error('Error fetching context:', error);
    return [];
  }
};

// Function to generate response based on context and user query
const generateResponse = async (query, context) => {
  try {
    // Simple keyword-based response generation
    const queryLower = query.toLowerCase();
    let response = '';

    // Check for different types of questions
    if (queryLower.includes('hospital') && queryLower.includes('in')) {
      const cityMatches = context.filter(h => 
        queryLower.includes(h.city.toLowerCase())
      );
      if (cityMatches.length > 0) {
        response = `Here are the hospitals in ${cityMatches[0].city}:\n`;
        cityMatches.forEach(h => {
          response += `- ${h.name} (${h.specialities})\n`;
        });
      }
    } else if (queryLower.includes('doctor') || queryLower.includes('doctors')) {
      const totalDoctors = context.reduce((sum, h) => sum + h.numberOfDoctors, 0);
      response = `We have a total of ${totalDoctors} doctors across all our hospitals.`;
    } else if (queryLower.includes('specialit')) {
      const allSpecialities = new Set();
      context.forEach(h => {
        h.specialities.split(', ').forEach(s => allSpecialities.add(s));
      });
      response = `Our hospitals offer the following specialities: ${Array.from(allSpecialities).join(', ')}`;
    } else if (queryLower.includes('department')) {
      const totalDepartments = context.reduce((sum, h) => sum + h.numberOfDepartments, 0);
      response = `We have ${totalDepartments} departments across all our hospitals.`;
    } else {
      response = "I can help you find information about our hospitals, doctors, specialities, and departments. What would you like to know?";
    }

    return response;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'I apologize, but I encountered an error while processing your question. Please try again.';
  }
};

module.exports = {
  getContext,
  generateResponse
}; 