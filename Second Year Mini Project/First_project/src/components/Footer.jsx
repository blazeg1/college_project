// src/components/Footer.js
import React from 'react';
import { FaRegCopyright, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { BsShieldFillCheck } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className=" bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 w-[100%] ">
            <div className="container  px-6 py-12 w-[100%]">
    
                <div className="grid grid-cols-1 gap-20  md:grid-cols-3 lg:grid-cols-3 w-[100%]">

                    {/* Column 1: Saarthi Branding */}
                    <div>
                        <div className="mb-4 flex items-center space-x-2">
                            <img src="public/logo.png" alt="Saarthi Logo" className="h-10" />
                            <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                                Saarthi
                            </span>
                        </div>
                        <p className="mb-4 text-sm leading-relaxed">
                            Supporting student mental health and wellbeing through accessible, confidential, and comprehensive mental health services.
                        </p>
                        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                            <BsShieldFillCheck className="mr-2 text-base text-green-600" />
                            HIPAA Compliant
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="mb-5 font-bold uppercase text-slate-800 dark:text-slate-100">
                            Quick Links
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#assessment" className="hover:text-indigo-600 dark:hover:text-indigo-400">Mental Health Assessment</a></li>
                            <li><a href="#appointment" className="hover:text-indigo-600 dark:hover:text-indigo-400">Book Appointment</a></li>
                            <li><a href="#resources" className="hover:text-indigo-600 dark:hover:text-indigo-400">Resources</a></li>
                            <li><a href="#chat" className="hover:text-indigo-600 dark:hover:text-indigo-400">Support Chat</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Emergency Support */}
                    <div>
                        <h4 className="mb-5 font-bold uppercase text-slate-800 dark:text-slate-100">
                            Emergency Support
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center"><FaPhoneAlt className="mr-2.5 text-slate-500 dark:text-slate-400" /> Crisis Hotline: 988</li>
                            <li className="flex items-center"><FaPhoneAlt className="mr-2.5 text-slate-500 dark:text-slate-400" /> Campus Security: 911</li>
                            <li className="flex items-center"><FaEnvelope className="mr-2.5 text-slate-500 dark:text-slate-400" /><a href="mailto:support@saarthi.edu" className="hover:text-indigo-600 dark:hover:text-indigo-400">support@saarthi.edu</a></li>
                        </ul>
                        <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                            <p className="mb-1 font-bold">Crisis?</p>
                            <p className="text-sm leading-snug">If you're in immediate danger, call 911 or go to your nearest emergency room.</p>
                        </div>
                    </div>
                </div>

            
                <div className="mt-12 border-t border-slate-200 pt-8 text-sm dark:border-slate-800 w-[100%]">
                    <div className="flex flex-col items-center justify-between text-slate-500 dark:text-slate-400 md:flex-row">
                        <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Saarthi. All rights reserved.</p>
                        <div className="flex space-x-6">
                            <a href="#privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</a>
                            <a href="#terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</a>
                            <a href="#accessibility" className="hover:text-indigo-600 dark:hover:text-indigo-400">Accessibility</a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;