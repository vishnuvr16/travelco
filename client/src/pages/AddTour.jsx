import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
    PlusCircle, 
    Trash2, 
    ArrowRight, 
    Check, 
    Mountain, 
    MapPin, 
    DollarSign, 
    Compass,
    Calendar, 
    Clock,
    Image,
    Star,
    IndianRupee
    } from 'lucide-react';
import summaryApi from '../common';
import { useNavigate, useParams } from 'react-router-dom';

const AddTour = () => {
    const { control, register, handleSubmit, formState: { errors }, reset, setValue,watch } = useForm();
    
    // State for dynamic form fields
    const [highlights, setHighlights] = useState(['']);
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false)
    const [itineraryDays, setItineraryDays] = useState([{ 
        day: 1, 
        title: '', 
        description: '', 
        activities: [''] 
    }]);
    const [includedServices, setIncludedServices] = useState([{ icon: '', text: '' }]);
    const [photos, setPhotos] = useState(['']);
    const [currentStep, setCurrentStep] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [currentTourPackage, setCurrentTourPackage] = useState(null);
    const {tourId} = useParams();

     // Fetch tour data if editing
  useEffect(() => {
    const fetchTourData = async () => {
      if (!tourId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`${summaryApi.defaultUrl}/tours/${tourId}`, {
          method: "get",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tour data');
        }

        const tourData = await response.json();
        
        // Populate form with existing data
        setValue('name', tourData.name);
        setValue('destination', tourData.destination);
        setValue('duration', tourData.duration);
        setValue('difficulty', tourData.difficulty);
        setValue('price', tourData.price);
        setValue('overview', tourData.overview);
        setValue('availableDates', tourData.availableDates.join(', '));
        
        setHighlights(tourData.highlights);
        setItineraryDays(tourData.itinerary);
        setIncludedServices(tourData.includedServices);
        setPhotos(tourData.photos);
      } catch (error) {
        console.error('Error fetching tour data:', error);
        alert('Failed to load tour data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourData();
  }, [tourId, setValue]);

        

    // Utility functions for dynamic fields
    const addField = (setter) => {
        setter(prev => [...prev, '']);
    };

    const updateField = (setter, index, value) => {
        setter(prev => {
        const newFields = [...prev];
        newFields[index] = value;
        return newFields;
        });
    };

    const removeField = (setter, index) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    // Specific update functions for complex fields
    const updateItineraryDay = (index, field, value) => {
        setItineraryDays(prev => {
        const newDays = [...prev];
        newDays[index][field] = value;
        return newDays;
        });
    };

    const addItineraryDay = () => {
        setItineraryDays(prev => [...prev, { 
        day: prev.length + 1, 
        title: '', 
        description: '', 
        activities: [''] 
        }]);
    };

    const removeItineraryDay = (index) => {
        setItineraryDays(prev => prev.filter((_, i) => i !== index));
    };

    const addIncludedService = () => {
        setIncludedServices(prev => [...prev, { icon: '', text: '' }]);
    };

    const removeIncludedService = (index) => {
        setIncludedServices(prev => prev.filter((_, i) => i !== index));
    };

    const updateIncludedService = (index, field, value) => {
        setIncludedServices(prev => {
        const newServices = [...prev];
        newServices[index][field] = value;
        return newServices;
        });
    };

    const addItineraryActivity = (dayIndex) => {
        setItineraryDays(prev => {
        const newDays = [...prev];
        newDays[dayIndex].activities.push('');
        return newDays;
        });
    };

    const updateItineraryActivity = (dayIndex, activityIndex, value) => {
        setItineraryDays(prev => {
        const newDays = [...prev];
        newDays[dayIndex].activities[activityIndex] = value;
        return newDays;
        });
    };

    const removeItineraryActivity = (dayIndex, activityIndex) => {
        setItineraryDays(prev => {
        const newDays = [...prev];
        newDays[dayIndex].activities.splice(activityIndex, 1);
        return newDays;
        });
    };

    const onSubmit = async (data) => {
        const tourData = {
        ...data,
        highlights,
        itinerary: itineraryDays,
        includedServices,
        photos,
        availableDates: data.availableDates ? data.availableDates.split(',').map(date => new Date(date.trim())) : []
        };

        try {
        const endpoint = tourId 
            ? `${summaryApi.defaultUrl}/tours/${tourId}`
            : summaryApi.addTour.url;
        
        const method = tourId 
            ? "put"
            : summaryApi.addTour.method;

        const response = await fetch(endpoint, {
            method,
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(tourData)
        });

        if (response.ok) {
            alert(`Tour package ${tourId ? 'updated' : 'added'} successfully!`);
            resetForm();
            navigate('/admin')
        } else {
            throw new Error('Failed to submit tour package');
        }
        } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit tour package. Please try again.');
        }
    };

    const resetForm = () => {
        reset();
        setHighlights(['']);
        setItineraryDays([{ day: 1, title: '', description: '', activities: [''] }]);
        setIncludedServices([{ icon: '', text: '' }]);
        setPhotos(['']);
        setCurrentStep(1);
        setEditMode(false);
        setCurrentTourPackage(null);
    };

    const renderStep1 = () => (
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <Mountain className="mr-3 text-blue-600" /> Tour Basics
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div>
            <label className="block mb-2 text-gray-700 font-semibold">Tour Name</label>
            <div className="relative">
                <input 
                type="text" 
                {...register('name', { required: 'Tour name is required' })}
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" 
                placeholder="e.g., Breathtaking Himalayan Adventure" 
                />
                <Mountain className="absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
            <label className="block mb-2 text-gray-700 font-semibold">Destination</label>
            <div className="relative">
                <input 
                type="text" 
                {...register('destination', { required: 'Destination is required' })}
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" 
                placeholder="Himachal Pradesh, India" 
                />
                <MapPin className="absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
            </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
            <div>
            <label className="block mb-2 text-gray-700 font-semibold">Duration</label>
            <div className="relative">
                <input 
                type="text" 
                {...register('duration', { required: 'Duration is required' })}
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" 
                placeholder="7 Days / 6 Nights" 
                />
                <Clock className="absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
            </div>
            <div>
            <label className="block mb-2 text-gray-700 font-semibold">Difficulty</label>
            <select 
                {...register('difficulty', { required: 'Difficulty level is required' })}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
                <option value="Extreme">Extreme</option>
            </select>
            {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>}
            </div>
            <div>
            <label className="block mb-2 text-gray-700 font-semibold">Price</label>
            <div className="relative">
                <input 
                type="number" 
                {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be a positive number' }
                })}
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" 
                placeholder="Tour Price" 
                />
                <IndianRupee className="absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
        </div>
        <div>
            <label className="block mb-2 text-gray-700 font-semibold">Tour Overview</label>
            <textarea 
            {...register('overview', { required: 'Tour overview is required' })}
            className="w-full p-3 border-2 border-gray-300 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" 
            placeholder="Provide a detailed tour overview..."
            />
            {errors.overview && <p className="text-red-500 text-sm mt-1">{errors.overview.message}</p>}
        </div>
        <div className="flex justify-end">
            <button 
            type="button" 
            onClick={() => setCurrentStep(2)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
            Next Step <ArrowRight className="ml-2" />
            </button>
        </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <Star className="mr-3 text-yellow-600" /> Tour Highlights
        </h2>
        
        {/* Highlights Section */}
        <div>
            <div className="flex justify-between items-center mb-4">
            <label className="text-gray-700 font-semibold">Tour Highlights</label>
            <button 
                type="button" 
                onClick={() => addField(setHighlights)}
                className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition flex items-center"
            >
                <PlusCircle className="mr-2" /> Add Highlight
            </button>
            </div>
            {highlights.map((highlight, index) => (
            <div key={index} className="flex mb-3">
                <input 
                type="text" 
                value={highlight}
                onChange={(e) => updateField(setHighlights, index, e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg mr-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition" 
                placeholder="Enter tour highlight" 
                />
                {highlights.length > 1 && (
                <button 
                    type="button" 
                    onClick={() => removeField(setHighlights, index)}
                    className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
                >
                    <Trash2 />
                </button>
                )}
            </div>
            ))}
        </div>

        {/* Available Dates Section */}
        <div>
            <label className="block mb-2 text-gray-700 font-semibold">Available Dates (comma-separated)</label>
            <input 
            type="text" 
            {...register('availableDates', { 
                required: 'Available dates are required',
                validate: (value) => {
                const dates = value.split(',').map(date => date.trim());
                return dates.every(date => !isNaN(Date.parse(date))) || 'Invalid date format';
                }
            })}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition" 
            placeholder="YYYY-MM-DD, YYYY-MM-DD" 
            />
            {errors.availableDates && <p className="text-red-500 text-sm mt-1">{errors.availableDates.message}</p>}
        </div>

        {/* Photos Section */}
        <div>
            <div className="flex justify-between items-center mb-4">
            <label className="text-gray-700 font-semibold">Tour Photos</label>
            <button 
                type="button" 
                onClick={() => addField(setPhotos)}
                className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition flex items-center"
            >
                <PlusCircle className="mr-2" /> Add Photo
            </button>
            </div>
            {photos.map((photo, index) => (
            <div key={index} className="flex mb-3">
                <input 
                type="text" 
                value={photo}
                onChange={(e) => updateField(setPhotos, index, e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg mr-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition" 
                placeholder="Enter photo URL" 
                />
                {photos.length > 1 && (
                <button 
                    type="button" 
                    onClick={() => removeField(setPhotos, index)}
                    className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
                >
                    <Trash2 />
                </button>
                )}
            </div>
            ))}
        </div>

        <div className="flex justify-between">
            <button 
            type="button" 
            onClick={() => setCurrentStep(1)}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition flex items-center"
            >
            Previous Step
            </button>
            <button 
            type="button" 
            onClick={() => setCurrentStep(3)}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition flex items-center"
            >
            Next Step <ArrowRight className="ml-2" />
            </button>
        </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <Compass className="mr-3 text-green-600" /> Itinerary Details
        </h2>
        
        {/* Itinerary Section */}
        <div>
            <div className="flex justify-between items-center mb-4">
            <label className="text-gray-700 font-semibold">Tour Itinerary</label>
            <button 
                type="button" 
                onClick={addItineraryDay}
                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition flex items-center"
            >
                <PlusCircle className="mr-2" /> Add Day
            </button>
            </div>
            {itineraryDays.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-6 p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-gray-700">Day {day.day}</h3>
                {itineraryDays.length > 1 && (
                    <button 
                    type="button" 
                    onClick={() => removeItineraryDay(dayIndex)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                    Remove Day
                    </button>
                )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block mb-2 text-gray-700">Day Title</label>
                    <input 
                    type="text" 
                    value={day.title}
                    onChange={(e) => updateItineraryDay(dayIndex, 'title', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" 
                    placeholder="Day title" 
                    />
                </div>
                <div>
                    <label className="block mb-2 text-gray-700">Location</label>
                    <input 
                    type="text" 
                    value={day.description}
                    onChange={(e) => updateItineraryDay(dayIndex, 'description', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" 
                    placeholder="Location description" 
                    />
                </div>
                </div>
                
                {/* Activities Section */}
                <div>
                <div className="flex justify-between items-center mb-3">
                    <label className="text-gray-700 font-semibold">Activities</label>
                    <button 
                    type="button" 
                    onClick={() => addItineraryActivity(dayIndex)}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition flex items-center"
                    >
                    <PlusCircle className="mr-2" /> Add Activity
                    </button>
                </div>
                {day.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="flex mb-3">
                    <input 
                        type="text" 
                        value={activity}
                        onChange={(e) => updateItineraryActivity(dayIndex, activityIndex, e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg mr-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" 
                        placeholder="Enter activity details" 
                    />
                    {day.activities.length > 1 && (
                        <button 
                        type="button" 
                        onClick={() => removeItineraryActivity(dayIndex, activityIndex)}
                        className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
                        >
                        <Trash2 />
                        </button>
                    )}
                    </div>
                ))}
                </div>
            </div>
            ))}
        </div>

        <div className="flex justify-between">
            <button 
            type="button" 
            onClick={() => setCurrentStep(2)}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition flex items-center"
            >
            Previous Step
            </button>
            <button 
            type="button" 
            onClick={() => setCurrentStep(4)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center"
            >
            Next Step <ArrowRight className="ml-2" />
            </button>
        </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <Image className="mr-3 text-purple-600" /> Included Services
        </h2>
        
        {/* Included Services Section */}
        <div>
            <div className="flex justify-between items-center mb-4">
            <label className="text-gray-700 font-semibold">Included Services</label>
            <button 
                type="button" 
                onClick={addIncludedService}
                className="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition flex items-center"
            >
                <PlusCircle className="mr-2" /> Add Service
            </button>
            </div>
            {includedServices.map((service, index) => (
            <div key={index} className="flex mb-3">
                <select 
                value={service.icon}
                onChange={(e) => updateIncludedService(index, 'icon', e.target.value)}
                className="w-1/4 p-3 border-2 border-gray-300 rounded-lg mr-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                >
                <option value="">Select Icon</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Meals">Meals</option>
                <option value="Transport">Transport</option>
                <option value="Guide">Guide</option>
                <option value="Equipment">Equipment</option>
                </select>
                <input 
                type="text" 
                value={service.text}
                onChange={(e) => updateIncludedService(index, 'text', e.target.value)}
                className="w-3/4 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition" 
                placeholder="Service description" 
                />
                {includedServices.length > 1 && (
                <button 
                    type="button" 
                    onClick={() => removeIncludedService(index)}
                    className="bg-red-500 text-white p-3 rounded-lg ml-3 hover:bg-red-600 transition"
                >
                    <Trash2 />
                </button>
                )}
            </div>
            ))}
        </div>

        <div className="flex justify-between">
            <button 
            type="button" 
            onClick={() => setCurrentStep(3)}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition flex items-center"
            >
            Previous Step
            </button>
            <button 
            type="button" 
            onClick={() => setCurrentStep(5)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center"
            >
            Next Step <ArrowRight className="ml-2" />
            </button>
        </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <Check className="mr-3 text-blue-600" /> Review and Submit
        </h2>
        
        {/* Review Section */}
        <div className="grid md:grid-cols-2 gap-6">
            <div>
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
            <div className="space-y-2">
                <p><strong>Tour Name:</strong> {watch('name')}</p>
                <p><strong>Destination:</strong> {watch('destination')}</p>
                <p><strong>Duration:</strong> {watch('duration')}</p>
                <p><strong>Difficulty:</strong> {watch('difficulty')}</p>
                <p><strong>Price:</strong> ${watch('price')}</p>
            </div>
            </div>
            <div>
            <h3 className="text-xl font-semibold mb-4">Highlights</h3>
            <ul className="list-disc pl-5">
                {highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
                ))}
            </ul>
            </div>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-4">Tour Overview</h3>
            <p>{watch('overview')}</p>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-4">Available Dates</h3>
            <p>{watch('availableDates')}</p>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-4">Photos</h3>
            <div className="grid grid-cols-3 gap-4">
            {photos.map((photo, index) => (
                <img 
                key={index} 
                src={photo} 
                alt={`Tour photo ${index + 1}`} 
                className="w-full h-40 object-cover rounded-lg" 
                />
            ))}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
            {itineraryDays.map((day, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-bold">Day {day.day}: {day.title}</h4>
                <p className="text-gray-600 mb-2">{day.description}</p>
                <ul className="list-disc pl-5">
                {day.activities.map((activity, actIndex) => (
                    <li key={actIndex}>{activity}</li>
                ))}
                </ul>
            </div>
            ))}
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-4">Included Services</h3>
            <div className="grid md:grid-cols-2 gap-4">
            {includedServices.map((service, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
                <span>{service.icon}</span>
                <span>{service.text}</span>
                </div>
            ))}
            </div>
        </div>

        <div className="flex justify-between">
            <button 
            type="button" 
            onClick={() => setCurrentStep(4)}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition flex items-center"
            >
            Previous Step
            </button>
            <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
            Submit Tour Package <Check className="ml-2" />
            </button>
        </div>
        </div>
    );

    if (isLoading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        );
      }

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
        </form>
        </div>
    );
    };

    export default AddTour;