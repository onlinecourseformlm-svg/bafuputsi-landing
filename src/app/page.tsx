"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, DollarSign, MessageCircle, Award, Scale, Briefcase, Users, Frown, GraduationCap, ChevronDown, Quote, Calendar } from "lucide-react";
import Chatbot from "@/components/Chatbot";
import { trackContactFormSubmission, trackButtonClick } from "@/components/Analytics";
import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormMessage('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        trackContactFormSubmission();
      } else {
        setFormStatus('error');
        setFormMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Failed to send message. Please try again or call us directly.');
    }

    setTimeout(() => {
      setFormStatus('idle');
      setFormMessage('');
    }, 5000);
  };
  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className="bg-[#393942] text-white py-3">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center text-sm">
          <div className="flex flex-wrap gap-4">
            <a href="mailto:admin@bafuputsi.co.za" className="flex items-center gap-2 hover:text-[#c5ab95] transition">
              <Mail size={16} />
              <span>admin@bafuputsi.co.za</span>
            </a>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+27 62 323 2533</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Centurion, South Africa</span>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="#" className="hover:text-[#c5ab95] transition"><Facebook size={18} /></a>
            <a href="#" className="hover:text-[#c5ab95] transition"><Twitter size={18} /></a>
            <a href="#" className="hover:text-[#c5ab95] transition"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-[#c5ab95] transition"><Instagram size={18} /></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="https://ext.same-assets.com/950676793/201971675.png" alt="Bafuputsi Trading" className="h-16" />
          </div>
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#c5ab95] hover:bg-[#a6876a] text-white px-6"
          >
            Free Consultation
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ext.same-assets.com/950676793/336561726.webp')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight drop-shadow-lg">
            RELIABLE AND EFFECTIVE<br />LABOUR LAW SOLUTIONS
          </h1>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant="outline"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#393942] px-8 py-6 text-lg transition-all duration-300"
            >
              Know More
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#393942] px-8 py-6 text-lg transition-all duration-300"
            >
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition border-t-4 border-[#c5ab95]">
              <div className="w-20 h-20 rounded-full border-2 border-[#c5ab95] flex items-center justify-center mx-auto mb-4">
                <DollarSign size={40} className="text-[#c5ab95]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fair Fees</h3>
              <p className="text-gray-600 leading-relaxed">
                In the course of providing services to our client, we might identify gaps in policies, procedures or processes.
                Depending on the amount of work required there might not be additional cost to address those identified gaps.
              </p>
            </Card>

            <Card className="p-8 text-center bg-[#393942] text-white hover:shadow-lg transition">
              <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Free Consultation</h3>
              <p className="leading-relaxed">
                Bafuputsi will always provide free consultation for our clients based on the time spent to come up with the advice.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition border-t-4 border-[#c5ab95]">
              <div className="w-20 h-20 rounded-full border-2 border-[#c5ab95] flex items-center justify-center mx-auto mb-4">
                <Award size={40} className="text-[#c5ab95]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Quality Representation</h3>
              <p className="text-gray-600 leading-relaxed">
                When we initiate cases, we prefer doing the investigation ourselves, formulate charges, compile the file of evidence
                and decide on the appropriate witnesses.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Practice Areas</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition border-t-4 border-[#8a624a] group">
              <Scale size={50} className="text-[#c5ab95] mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-3">Choosing the right Labour Law and HR Consultant</h3>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition border-t-4 border-[#8a624a] group">
              <Briefcase size={50} className="text-[#c5ab95] mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-3">Labour Law & Labour Relations Services</h3>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition border-t-4 border-[#8a624a] group">
              <Users size={50} className="text-[#c5ab95] mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-3">HR Services And Compliance Support</h3>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition border-t-4 border-[#8a624a] group">
              <Frown size={50} className="text-[#c5ab95] mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-3">Dispute Resolutions</h3>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition border-t-4 border-[#8a624a] group">
              <GraduationCap size={50} className="text-[#c5ab95] mx-auto mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-3">Training</h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-0">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: "url('https://ext.same-assets.com/950676793/856598445.webp')" }} />
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: "url('https://ext.same-assets.com/950676793/1420903138.webp')" }} />
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: "url('https://ext.same-assets.com/950676793/3446987892.webp')" }} />
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: "url('https://ext.same-assets.com/950676793/2949648717.webp')" }} />
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: "url('https://ext.same-assets.com/950676793/3640580732.webp')" }} />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">About Bafuputsi Trading</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We are Management and Labour Consultants based in Centurion, Gauteng. Bafuputsi Trading has been in operation for over 10 years,
              providing expert consultation and support to businesses across South Africa.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our team specializes in five key areas: choosing the right Law and Labour Consultant, Labour Law and Labour Relations Services,
              HR Services and Compliance Support, Dispute Resolutions, and Training. We are committed to providing reliable, effective, and
              affordable solutions to all your labour law and HR needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#c5ab95] mb-2">10+</div>
              <p className="text-gray-600">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#c5ab95] mb-2">500+</div>
              <p className="text-gray-600">Clients Served</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#c5ab95] mb-2">5</div>
              <p className="text-gray-600">Core Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What People Say</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition">
              <Quote size={40} className="text-[#c5ab95] mb-4" />
              <p className="text-gray-600 italic mb-4">
                "Bafuputsi is uniquely placed to be African Elders Wisdom kraal in the 21st century. Not only do they embrace your company culture,
                they go beyond to speak about industry matters in your cultural identity."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#c5ab95] rounded-full flex items-center justify-center text-white font-bold">
                  ZK
                </div>
                <div>
                  <p className="font-bold">Zizwe Khumalo</p>
                  <p className="text-sm text-gray-500">Business Owner</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition">
              <Quote size={40} className="text-[#c5ab95] mb-4" />
              <p className="text-gray-600 italic mb-4">
                "Just in time is the only explanation we give to Bafuputsi as a company. Our HR services and strategy was a mess
                and Bafuputsi just came in time to rescue us. Thank you for the wonderful services."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#c5ab95] rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <p className="font-bold">Senzo Mehlomakhulu</p>
                  <p className="text-sm text-gray-500">HR Manager</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition">
              <Quote size={40} className="text-[#c5ab95] mb-4" />
              <p className="text-gray-600 italic mb-4">
                "Bafuputsi has presided over our disciplinary hearings and we have found time to focus in our core business.
                Thank you Bafuputsi."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#c5ab95] rounded-full flex items-center justify-center text-white font-bold">
                  EB
                </div>
                <div>
                  <p className="font-bold">Elton Brown</p>
                  <p className="text-sm text-gray-500">CEO</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-center text-gray-600 mb-12">Find answers to common questions about our services</p>

            <div className="space-y-4">
              <Card className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-bold text-lg">Is employer expected to request an employee to make representation before placing them on precautionary suspension?</span>
                  <ChevronDown className={`transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === 1 && (
                  <div className="p-6 pt-0 text-gray-600">
                    <p>
                      The requirement that employers conduct pre-suspension hearings prior to confirming the precautionary suspension of an employee has been debunked
                      by the Constitutional Court judgement recently handed down on 19 February 2019. The court held that where the suspension is precautionary and not
                      punitive, there is no requirement to afford the employee an opportunity to make representations.
                    </p>
                  </div>
                )}
              </Card>

              <Card className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-bold text-lg">Is legal representation allowed at CCMA?</span>
                  <ChevronDown className={`transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === 2 && (
                  <div className="p-6 pt-0 text-gray-600">
                    <p className="mb-3">
                      CCMA rules stipulate certain instances where legal representation is not automatically allowed. The CCMA considers:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The nature of the questions of law raised</li>
                      <li>The complexity of the matter</li>
                      <li>The public interest</li>
                      <li>The comparative ability of the applicant and the respondent</li>
                    </ul>
                  </div>
                )}
              </Card>

              <Card className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-bold text-lg">What is the difference between misconduct and poor performance?</span>
                  <ChevronDown className={`transition-transform ${openFaq === 3 ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === 3 && (
                  <div className="p-6 pt-0 text-gray-600">
                    <p className="mb-3">
                      <strong>Poor performance</strong> occurs when an employee fails to do their job to the standard set out in the contract of employment
                      and job description. The focus is on the quality or quantity of the employee's work.
                    </p>
                    <p>
                      <strong>Misconduct</strong> occurs when an employee's behaviour is unacceptable or in breach of workplace rules. This includes violations
                      of timekeeping, attendance, honesty, safety, or other conduct rules.
                    </p>
                  </div>
                )}
              </Card>

              <Card className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-bold text-lg">How do we apply for SETA funding?</span>
                  <ChevronDown className={`transition-transform ${openFaq === 4 ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === 4 && (
                  <div className="p-6 pt-0 text-gray-600">
                    <p className="mb-3">
                      There are 21 Sector Education and Training Authorities who receive levies collected by SARS from different levy paying companies.
                      The funds are divided into:
                    </p>
                    <p className="mb-2">
                      <strong>Mandatory Grants:</strong> A percentage that the SETA must pay back to levy paying companies that fulfil requirements including
                      submission of Workplace Skills plans and Annual Training Reports.
                    </p>
                    <p>
                      <strong>Discretionary Grants:</strong> Developed and paid out at the discretion of the SETA Management and Board. Most SETAs advertise
                      for discretionary grants applications.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Recent News</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="overflow-hidden hover:shadow-xl transition group cursor-pointer">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/950676793/3918153644.webp"
                  alt="Law and Politics"
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#c5ab95] text-white px-3 py-1 rounded-full text-sm">
                  <Calendar size={14} className="inline mr-1" />
                  4 Feb
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Law</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Politics</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#c5ab95] transition">
                  Law and Politics: The disingenuous call for the removal of Julius Malema and Dali Mpofu from the Judicial Service Commission
                </h3>
                <p className="text-gray-600 text-sm">
                  The battle between conventional modernist thought and emerging black philosophy has defined 20th century political society...
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition group cursor-pointer">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/950676793/3147220074.webp"
                  alt="Constitution"
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#c5ab95] text-white px-3 py-1 rounded-full text-sm">
                  <Calendar size={14} className="inline mr-1" />
                  18 Jan
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Constitution</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Law</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#c5ab95] transition">
                  Unpacking Tourism Minister Lindiwe Sisulu's Constitution salvo through the lens of philosophy
                </h3>
                <p className="text-gray-600 text-sm">
                  Approaching the recent attack on South Africa's Constitution and legal structure in light of the sea of philosophical thought...
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition group cursor-pointer">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/950676793/2403638506.webp"
                  alt="Justice"
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#c5ab95] text-white px-3 py-1 rounded-full text-sm">
                  <Calendar size={14} className="inline mr-1" />
                  7 Jan
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Law</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#c5ab95] transition">
                  Lindiwe Sisulu: Hi Mzansi, have we seen justice?
                </h3>
                <p className="text-gray-600 text-sm">
                  Apartheid was legal. Jim Crow laws in the United States were legal. Colonialism was legal. Even the Nazis were legal. So...
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Request A Free Consultation</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
              <p className="text-gray-600 mb-4">Clients are allowed to call us after hours on emergencies.</p>
              <ul className="space-y-2 mb-8">
                <li>Mon – Wed : 8:00am – 06:00pm</li>
                <li>Thu – Sat : 10:00am – 10:00pm</li>
                <li className="font-bold">Sunday : Closed</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Address</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-sm mb-1">LOCATION</p>
                  <p className="text-gray-700">Centurion, South Africa</p>
                </div>
                <div>
                  <p className="font-bold text-sm mb-1">EMAIL US</p>
                  <a href="mailto:admin@bafuputsi.co.za" className="text-[#8a624a] hover:underline">
                    admin@bafuputsi.co.za
                  </a>
                </div>
                <div>
                  <p className="font-bold text-sm mb-1">PHONE</p>
                  <p className="text-gray-700">+27 62 323 2533</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input
                    placeholder="First"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input
                    placeholder="Last"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Comment or Message *</label>
                <Textarea
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              {formMessage && (
                <div className={`p-4 rounded ${formStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {formMessage}
                </div>
              )}

              <Button
                type="submit"
                disabled={formStatus === 'loading'}
                className="bg-[#393942] hover:bg-[#2d2d35] text-white px-8 py-6 text-lg w-full md:w-auto disabled:opacity-50"
              >
                {formStatus === 'loading' ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#393942] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We are Management and Labour Consultants based in Centurion, Gauteng. Bafuputsi Trading has been in operation for over 10 years.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Practice Areas</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#c5ab95] transition">Labour Law Consultant</a></li>
                <li><a href="#" className="hover:text-[#c5ab95] transition">Dispute Resolutions</a></li>
                <li><a href="#" className="hover:text-[#c5ab95] transition">HR Services</a></li>
                <li><a href="#" className="hover:text-[#c5ab95] transition">Training</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Recent News</h3>
              <p className="text-sm text-gray-300">Stay updated with our latest insights on labour law and HR matters.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-bold mb-1">LOCATION</p>
                  <p className="text-gray-300">Centurion, South Africa</p>
                </div>
                <div>
                  <p className="font-bold mb-1">EMAIL US</p>
                  <a href="mailto:admin@bafuputsi.co.za" className="text-gray-300 hover:text-[#c5ab95] transition">
                    admin@bafuputsi.co.za
                  </a>
                </div>
                <div>
                  <p className="font-bold mb-1">PHONE</p>
                  <p className="text-gray-300">T: +27 62 323 2533</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-8 flex flex-wrap justify-between items-center">
            <p className="text-sm text-gray-400">© 2022 All Right Reserved Bafuputsi.Com</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#c5ab95] transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-[#c5ab95] transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#c5ab95] transition"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-[#c5ab95] transition"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
