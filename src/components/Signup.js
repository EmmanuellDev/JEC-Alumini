import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [captchaValid, setCaptchaValid] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  
  const onCaptchaChange = (value) => {
    setCaptchaValid(value !== null);
  };

  const onSubmitStep1 = (data) => {
    console.log(data);
    setStep(2);
  };

  const onSubmitStep2 = (data) => {
    console.log(data);
    setStep(3);
  };

  const onSubmitFinal = (data) => {
    console.log(data);
    alert('Signup Successful');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
      
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitStep1)} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700">Email:</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Confirm Email:</label>
            <input
              type="email"
              {...register('confirmEmail', { required: 'Please confirm your email' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.confirmEmail && <p className="text-red-500 text-sm">{errors.confirmEmail.message}</p>}
          </div>

          <div>
            <button type="submit" className="w-full p-3 bg-teal-500 text-white rounded-md disabled:opacity-50">Next</button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmitStep2)} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700">First Name:</label>
            <input
              type="text"
              {...register('firstName', { required: 'First Name is required' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Last Name:</label>
            <input
              type="text"
              {...register('lastName', { required: 'Last Name is required' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Gender:</label>
            <select {...register('gender', { required: 'Gender is required' })} className="p-3 border border-gray-300 rounded-md">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Date of Birth:</label>
            <DatePicker
              selected={new Date()}
              onChange={(date) => setValue('dob', date)}
              className="p-3 border border-gray-300 rounded-md"
              dateFormat="yyyy/MM/dd"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Mobile Number:</label>
            <input
              type="tel"
              {...register('mobile', { required: 'Mobile number is required' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Present Location:</label>
            <input
              type="text"
              {...register('location', { required: 'Location is required' })}
              className="p-3 border border-gray-300 rounded-md"
              placeholder="Country, State, City"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Password:</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Confirm Password:</label>
            <input
              type="password"
              {...register('confirmPassword', { required: 'Confirm Password is required' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <button type="submit" className="w-full p-3 bg-teal-500 text-white rounded-md">Next</button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmitFinal)} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700">Select Branch:</label>
            <select {...register('branch', { required: 'Select your branch' })} className="p-3 border border-gray-300 rounded-md">
              <option value="">Select</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="Mech">Mechanical</option>
            </select>
            {errors.branch && <p className="text-red-500 text-sm">{errors.branch.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Graduation Year:</label>
            <input
              type="text"
              {...register('gradYear', { required: 'Graduation year is required' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.gradYear && <p className="text-red-500 text-sm">{errors.gradYear.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Convocation Year:</label>
            <input
              type="text"
              {...register('convocationYear', { required: 'Convocation year is required' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.convocationYear && <p className="text-red-500 text-sm">{errors.convocationYear.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">University Register Number:</label>
            <input
              type="text"
              {...register('registerNumber', { required: 'Register number is required' })}
              className="p-3 border border-gray-300 rounded-md"
            />
            {errors.registerNumber && <p className="text-red-500 text-sm">{errors.registerNumber.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Are you presently employed?</label>
            <select {...register('employed', { required: 'Employment status is required' })} className="p-3 border border-gray-300 rounded-md">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.employed && <p className="text-red-500 text-sm">{errors.employed.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Upload Photo:</label>
            <input type="file" {...register('photo', { required: 'Please upload your photo' })} className="p-3 border border-gray-300 rounded-md" />
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
          </div>

          <div>
            <button type="submit" className="w-full p-3 bg-teal-500 text-white rounded-md">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
