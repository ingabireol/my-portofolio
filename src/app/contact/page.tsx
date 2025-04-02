"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant, slideInVariant, staggerContainerVariant } from '@/lib/animationVariants';
import Button from '@/components/ui/Button';

// Form field interface
interface FormField {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string;
  error: string;
}

const ContactPage = () => {
  // Form state
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: 'name',
      name: 'name',
      type: 'text',
      placeholder: 'Your Name',
      required: true,
      value: '',
      error: '',
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Your Email',
      required: true,
      value: '',
      error: '',
    },
    {
      id: 'subject',
      name: 'subject',
      type: 'text',
      placeholder: 'Subject',
      required: true,
      value: '',
      error: '',
    },
  ]);

  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input change
  const handleInputChange = (id: string, value: string) => {
    setFormFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? { ...field, value, error: '' } : field
      )
    );
  };

  // Handle message change
  const handleMessageChange = (value: string) => {
    setMessage(value);
    setMessageError('');
  };

  // Form validation
  const validateForm = (): boolean => {
    let isValid = true;
    
    // Validate fields
    const updatedFields = formFields.map(field => {
      if (field.required && !field.value.trim()) {
        isValid = false;
        return { ...field, error: 'This field is required' };
      }
      
      if (field.id === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          return { ...field, error: 'Please enter a valid email address' };
        }
      }
      
      return field;
    });
    
    setFormFields(updatedFields);
    
    // Validate message
    if (!message.trim()) {
      setMessageError('Please enter your message');
      isValid = false;
    }
    
    return isValid;
  };

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real application, you would send the form data to your server or a form service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form after successful submission
      setFormFields(formFields.map(field => ({ ...field, value: '' })));
      setMessage('');
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariant}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeUpVariant}
              className="text-4xl font-bold mb-6 text-center"
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant}
              className="text-muted-foreground text-lg text-center"
            >
              Have a question or want to work together? Feel free to reach out!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInVariant('left')}
            >
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/10 border border-primary/30 text-primary p-6 rounded-lg"
                >
                  <h3 className="text-xl font-medium mb-2">Thank you for your message!</h3>
                  <p className="mb-4">I&apos;ve received your inquiry and will get back to you as soon as possible.</p>
                  <Button onClick={() => setFormSubmitted(false)}>Send Another Message</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formFields.map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium mb-2">
                        {field.placeholder} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={`w-full px-4 py-2 rounded-md border ${
                          field.error ? 'border-red-500' : 'border-border'
                        } bg-card focus:outline-none focus:ring-2 focus:ring-primary/50`}
                        required={field.required}
                      />
                      {field.error && (
                        <p className="mt-1 text-sm text-red-500">{field.error}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      value={message}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-2 rounded-md border ${
                        messageError ? 'border-red-500' : 'border-border'
                      } bg-card focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      required
                    />
                    {messageError && (
                      <p className="mt-1 text-sm text-red-500">{messageError}</p>
                    )}
                  </div>

                  <Button type="submit" fullWidth isLoading={isSubmitting}>
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInVariant('right')}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Feel free to reach out with any questions or inquiries. I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <a 
                      href="mailto:hello@example.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Phone</h3>
                    <a 
                      href="tel:+1234567890" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +123 456 7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Location</h3>
                    <p className="text-muted-foreground">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-border">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="GitHub"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map or image section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="relative h-96 rounded-xl overflow-hidden shadow-lg"
          >
            {/* In a real project, you might use a Google Maps embed here */}
            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-2xl font-semibold mb-4">Visit Me</h3>
                <p className="text-muted-foreground">
                  123 Developer Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariant}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeUpVariant}
              className="text-3xl font-bold mb-12 text-center"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-6">
              <motion.div 
                variants={fadeUpVariant}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">What services do you offer?</h3>
                <p className="text-muted-foreground">
                  I offer full-stack web development services including frontend development, backend development, responsive design, performance optimization, and web application development.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUpVariant}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">What is your typical project timeline?</h3>
                <p className="text-muted-foreground">
                  Project timelines vary depending on the scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months or more. I&apos;ll provide a detailed timeline during our initial consultation.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUpVariant}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">Do you offer maintenance services?</h3>
                <p className="text-muted-foreground">
                  Yes, I offer ongoing maintenance and support services to ensure your website or application continues to run smoothly. We can discuss maintenance packages based on your specific needs.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUpVariant}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">How do we get started working together?</h3>
                <p className="text-muted-foreground">
                  Simply reach out through the contact form above or send me an email. We&apos;ll schedule an initial consultation to discuss your project requirements, goals, timeline, and budget. From there, I&apos;ll provide a proposal and we can move forward with the development process.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;