import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, MessageSquare, Send } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    // In a real app, this would submit to a backend
    console.log('Form data:', data);
    setIsSubmitted(true);
    reset();
    
    // Reset the submitted state after a few seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-1 text-lg text-gray-600">
            Have questions or feedback? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-medium text-green-900">Email Us</h3>
                </div>
                <p className="text-green-800">
                  Our support team is always ready to help with any questions.
                </p>
                <a href="mailto:support@healthmaster.com" className="mt-2 inline-block text-green-600 hover:text-green-800">
                  support@healthmaster.com
                </a>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-blue-900">Feedback</h3>
                </div>
                <p className="text-blue-800">
                  Your feedback helps us improve. Let us know what you think about our platform.
                </p>
                <a href="#feedback-form" className="mt-2 inline-block text-blue-600 hover:text-blue-800">
                  Share your thoughts
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Card title="Send us a message" id="feedback-form">
              {isSubmitted ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4">
                  <div className="flex">
                    <div>
                      <p className="text-sm text-green-700">
                        Thank you for your message! We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      placeholder="Enter your name"
                      error={errors.name?.message}
                      {...register('name', { required: 'Name is required' })}
                    />
                    
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      error={errors.email?.message}
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                  </div>
                  
                  <Input
                    label="Subject"
                    placeholder="What is your message about?"
                    error={errors.subject?.message}
                    {...register('subject', { required: 'Subject is required' })}
                  />
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      className={`px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${errors.message ? 'border-red-500' : 'border-gray-300'}
                        w-full min-h-[150px]`}
                      placeholder="How can we help you?"
                      {...register('message', { 
                        required: 'Message is required',
                        minLength: {
                          value: 10,
                          message: 'Message must be at least 10 characters'
                        }
                      })}
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    variant="primary"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};