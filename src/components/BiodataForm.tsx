import React, { useState } from 'react';
import { Calendar, FileText, Download, User, MapPin, Users, GraduationCap, Briefcase, FileCheck, Send, CheckCircle } from 'lucide-react';

interface PersonalDetails {
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  nationality: string;
  religion: string;
  caste: string;
  maritalStatus: string;
  phone: string;
  email: string;
  aadharNumber: string;
}

interface Address {
  permanent: string;
  current: string;
  pincode: string;
  district: string;
  state: string;
}

interface FamilyMember {
  id: string;
  relationship: string;
  name: string;
  age: string;
  occupation: string;
  income: string;
}

interface Education {
  id: string;
  qualification: string;
  institution: string;
  board: string;
  yearOfPassing: string;
  percentage: string;
}

interface WorkExperience {
  id: string;
  company: string;
  designation: string;
  duration: string;
  salary: string;
  reasonForLeaving: string;
}

interface OfficeUse {
  applicationNumber: string;
  dateReceived: string;
  interviewDate: string;
  interviewResult: string;
  remarks: string;
}

const BiodataForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    nationality: 'Indian',
    religion: '',
    caste: '',
    maritalStatus: '',
    phone: '',
    email: '',
    aadharNumber: '',
  });

  const [address, setAddress] = useState<Address>({
    permanent: '',
    current: '',
    pincode: '',
    district: '',
    state: '',
  });

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', relationship: 'Father', name: '', age: '', occupation: '', income: '' },
    { id: '2', relationship: 'Mother', name: '', age: '', occupation: '', income: '' },
    { id: '3', relationship: 'Spouse', name: '', age: '', occupation: '', income: '' },
  ]);

  const [education, setEducation] = useState<Education[]>([
    { id: '1', qualification: '10th Standard', institution: '', board: '', yearOfPassing: '', percentage: '' },
    { id: '2', qualification: '12th Standard', institution: '', board: '', yearOfPassing: '', percentage: '' },
    { id: '3', qualification: 'Graduation', institution: '', board: '', yearOfPassing: '', percentage: '' },
  ]);

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    { id: '1', company: '', designation: '', duration: '', salary: '', reasonForLeaving: '' },
  ]);

  const [signature, setSignature] = useState('');
  const [declarationDate, setDeclarationDate] = useState('');

  const [officeUse, setOfficeUse] = useState<OfficeUse>({
    applicationNumber: '',
    dateReceived: '',
    interviewDate: '',
    interviewResult: '',
    remarks: '',
  });

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return '';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handlePersonalDetailsChange = (field: keyof PersonalDetails, value: string) => {
    setPersonalDetails(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'dateOfBirth') {
        updated.age = calculateAge(value);
      }
      return updated;
    });
  };

  const addFamilyMember = () => {
    const newId = (familyMembers.length + 1).toString();
    setFamilyMembers([...familyMembers, { id: newId, relationship: '', name: '', age: '', occupation: '', income: '' }]);
  };

  const addEducation = () => {
    const newId = (education.length + 1).toString();
    setEducation([...education, { id: newId, qualification: '', institution: '', board: '', yearOfPassing: '', percentage: '' }]);
  };

  const addWorkExperience = () => {
    const newId = (workExperience.length + 1).toString();
    setWorkExperience([...workExperience, { id: newId, company: '', designation: '', duration: '', salary: '', reasonForLeaving: '' }]);
  };

  const handlePrint = () => {
    window.print();
  };

  const validateForm = () => {
    const requiredFields = [
      personalDetails.fullName,
      personalDetails.fatherName,
      personalDetails.motherName,
      personalDetails.dateOfBirth,
      personalDetails.gender,
      personalDetails.maritalStatus,
      personalDetails.phone,
      personalDetails.email,
      address.permanent,
      address.current,
      address.pincode,
      address.district,
      address.state,
      declarationDate,
      signature
    ];

    return requiredFields.every(field => field.trim() !== '');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleNewApplication = () => {
    setIsSubmitted(false);
    // Reset form
    setPersonalDetails({
      fullName: '',
      fatherName: '',
      motherName: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      nationality: 'Indian',
      religion: '',
      caste: '',
      maritalStatus: '',
      phone: '',
      email: '',
      aadharNumber: '',
    });
    setAddress({
      permanent: '',
      current: '',
      pincode: '',
      district: '',
      state: '',
    });
    setSignature('');
    setDeclarationDate('');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <img 
              src="/sarathy-group-logo.png" 
              alt="Sarathy Group Logo" 
              className="h-16 mx-auto mb-4"
            />
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Applying!</h1>
          <p className="text-gray-600 mb-6">
            Your biodata has been successfully submitted to Sarathy Group. 
            We will review your application and contact you soon.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleNewApplication}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Another Application
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
        {/* Header */}
        <div className="bg-white border-b-4 border-blue-600 p-6 print:border-2 print:border-black">
          <div className="flex items-center justify-center space-x-6">
            <img 
              src="/sarathy-group-logo.png" 
              alt="Sarathy Group Logo" 
              className="h-20 w-auto"
            />
            <div className="text-center">
              <h1 className="text-4xl font-bold text-blue-800">SARATHY GROUP</h1>
              <p className="text-blue-600 text-lg font-medium">Employee Biodata Form</p>
              <p className="text-blue-500 text-sm italic">Experience the new drive</p>
            </div>
          </div>
        </div>

        <div className="p-6 print:p-4 space-y-8">
          {/* Action Buttons */}
          <div className="flex justify-between items-center print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>

          {/* Personal Details */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b-2 border-blue-600 pb-2">
              <User className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={personalDetails.fullName}
                  onChange={(e) => handlePersonalDetailsChange('fullName', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name *</label>
                <input
                  type="text"
                  value={personalDetails.fatherName}
                  onChange={(e) => handlePersonalDetailsChange('fatherName', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name *</label>
                <input
                  type="text"
                  value={personalDetails.motherName}
                  onChange={(e) => handlePersonalDetailsChange('motherName', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <div className="relative">
                  <input
                    type="date"
                    value={personalDetails.dateOfBirth}
                    onChange={(e) => handlePersonalDetailsChange('dateOfBirth', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                  />
                  <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="text"
                  value={personalDetails.age}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select
                  value={personalDetails.gender}
                  onChange={(e) => handlePersonalDetailsChange('gender', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <input
                  type="text"
                  value={personalDetails.nationality}
                  onChange={(e) => handlePersonalDetailsChange('nationality', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                <input
                  type="text"
                  value={personalDetails.religion}
                  onChange={(e) => handlePersonalDetailsChange('religion', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
                <input
                  type="text"
                  value={personalDetails.caste}
                  onChange={(e) => handlePersonalDetailsChange('caste', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status *</label>
                <select
                  value={personalDetails.maritalStatus}
                  onChange={(e) => handlePersonalDetailsChange('maritalStatus', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={personalDetails.phone}
                  onChange={(e) => handlePersonalDetailsChange('phone', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={personalDetails.email}
                  onChange={(e) => handlePersonalDetailsChange('email', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                <input
                  type="text"
                  value={personalDetails.aadharNumber}
                  onChange={(e) => handlePersonalDetailsChange('aadharNumber', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b-2 border-blue-600 pb-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Address</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address *</label>
                <textarea
                  value={address.permanent}
                  onChange={(e) => setAddress(prev => ({ ...prev, permanent: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Address *</label>
                <textarea
                  value={address.current}
                  onChange={(e) => setAddress(prev => ({ ...prev, current: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress(prev => ({ ...prev, pincode: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                <input
                  type="text"
                  value={address.district}
                  onChange={(e) => setAddress(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                />
              </div>
            </div>
          </section>

          {/* Family Details */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 border-b-2 border-blue-600 pb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Family Details</h2>
              </div>
              <button
                onClick={addFamilyMember}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium print:hidden"
              >
                + Add Member
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 print:border-black">
                <thead>
                  <tr className="bg-gray-50 print:bg-gray-200">
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Relationship</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Age</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Occupation</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Monthly Income</th>
                  </tr>
                </thead>
                <tbody>
                  {familyMembers.map((member, index) => (
                    <tr key={member.id}>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={member.relationship}
                          onChange={(e) => {
                            const updated = [...familyMembers];
                            updated[index].relationship = e.target.value;
                            setFamilyMembers(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...familyMembers];
                            updated[index].name = e.target.value;
                            setFamilyMembers(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={member.age}
                          onChange={(e) => {
                            const updated = [...familyMembers];
                            updated[index].age = e.target.value;
                            setFamilyMembers(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={member.occupation}
                          onChange={(e) => {
                            const updated = [...familyMembers];
                            updated[index].occupation = e.target.value;
                            setFamilyMembers(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={member.income}
                          onChange={(e) => {
                            const updated = [...familyMembers];
                            updated[index].income = e.target.value;
                            setFamilyMembers(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Educational Qualifications */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 border-b-2 border-blue-600 pb-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Educational Qualifications</h2>
              </div>
              <button
                onClick={addEducation}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium print:hidden"
              >
                + Add Qualification
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 print:border-black">
                <thead>
                  <tr className="bg-gray-50 print:bg-gray-200">
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Qualification</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Institution</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Board/University</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Year of Passing</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Percentage/Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu, index) => (
                    <tr key={edu.id}>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={edu.qualification}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].qualification = e.target.value;
                            setEducation(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].institution = e.target.value;
                            setEducation(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={edu.board}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].board = e.target.value;
                            setEducation(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={edu.yearOfPassing}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].yearOfPassing = e.target.value;
                            setEducation(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={edu.percentage}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].percentage = e.target.value;
                            setEducation(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Work Experience */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 border-b-2 border-blue-600 pb-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
              </div>
              <button
                onClick={addWorkExperience}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium print:hidden"
              >
                + Add Experience
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 print:border-black">
                <thead>
                  <tr className="bg-gray-50 print:bg-gray-200">
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Company/Organization</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Designation</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Duration</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Salary</th>
                    <th className="border border-gray-300 print:border-black px-4 py-2 text-left">Reason for Leaving</th>
                  </tr>
                </thead>
                <tbody>
                  {workExperience.map((exp, index) => (
                    <tr key={exp.id}>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...workExperience];
                            updated[index].company = e.target.value;
                            setWorkExperience(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={exp.designation}
                          onChange={(e) => {
                            const updated = [...workExperience];
                            updated[index].designation = e.target.value;
                            setWorkExperience(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => {
                            const updated = [...workExperience];
                            updated[index].duration = e.target.value;
                            setWorkExperience(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={exp.salary}
                          onChange={(e) => {
                            const updated = [...workExperience];
                            updated[index].salary = e.target.value;
                            setWorkExperience(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 print:border-black px-4 py-2">
                        <input
                          type="text"
                          value={exp.reasonForLeaving}
                          onChange={(e) => {
                            const updated = [...workExperience];
                            updated[index].reasonForLeaving = e.target.value;
                            setWorkExperience(updated);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Declaration */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b-2 border-blue-600 pb-2">
              <FileCheck className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Declaration</h2>
            </div>
            
            <div className="bg-gray-50 print:bg-white p-4 rounded-lg print:border print:border-black">
              <p className="mb-4 text-sm text-gray-700">
                I hereby declare that all the information provided above is true and correct to the best of my knowledge. 
                I understand that any false information may lead to the rejection of my application or termination of employment.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    value={declarationDate}
                    onChange={(e) => setDeclarationDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Signature *</label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Type your full name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-black"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* For Office Use */}
          <section className="space-y-4 print:mt-8">
            <div className="flex items-center space-x-2 border-b-2 border-red-600 pb-2">
              <FileText className="h-5 w-5 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-800">For Office Use Only</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 print:border-black">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 print:border-black px-4 py-3 bg-gray-50 print:bg-gray-200 font-medium w-1/3">
                      Application Number
                    </td>
                    <td className="border border-gray-300 print:border-black px-4 py-3">
                      <input
                        type="text"
                        value={officeUse.applicationNumber}
                        onChange={(e) => setOfficeUse(prev => ({ ...prev, applicationNumber: e.target.value }))}
                        className="w-full border-none focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 print:border-black px-4 py-3 bg-gray-50 print:bg-gray-200 font-medium">
                      Date Received
                    </td>
                    <td className="border border-gray-300 print:border-black px-4 py-3">
                      <input
                        type="date"
                        value={officeUse.dateReceived}
                        onChange={(e) => setOfficeUse(prev => ({ ...prev, dateReceived: e.target.value }))}
                        className="w-full border-none focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 print:border-black px-4 py-3 bg-gray-50 print:bg-gray-200 font-medium">
                      Interview Date
                    </td>
                    <td className="border border-gray-300 print:border-black px-4 py-3">
                      <input
                        type="date"
                        value={officeUse.interviewDate}
                        onChange={(e) => setOfficeUse(prev => ({ ...prev, interviewDate: e.target.value }))}
                        className="w-full border-none focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 print:border-black px-4 py-3 bg-gray-50 print:bg-gray-200 font-medium">
                      Interview Result
                    </td>
                    <td className="border border-gray-300 print:border-black px-4 py-3">
                      <select
                        value={officeUse.interviewResult}
                        onChange={(e) => setOfficeUse(prev => ({ ...prev, interviewResult: e.target.value }))}
                        className="w-full border-none focus:outline-none"
                      >
                        <option value="">Select Result</option>
                        <option value="Selected">Selected</option>
                        <option value="Not Selected">Not Selected</option>
                        <option value="Pending">Pending</option>
                        <option value="Waitlisted">Waitlisted</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 print:border-black px-4 py-3 bg-gray-50 print:bg-gray-200 font-medium">
                      Remarks
                    </td>
                    <td className="border border-gray-300 print:border-black px-4 py-3">
                      <textarea
                        value={officeUse.remarks}
                        onChange={(e) => setOfficeUse(prev => ({ ...prev, remarks: e.target.value }))}
                        rows={3}
                        className="w-full border-none focus:outline-none resize-none"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Submit Button at Bottom */}
          <div className="flex justify-center pt-6 print:hidden">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataForm;