
import React from "react";
import { Send, Linkedin, Github, Twitter, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="container max-w-5xl">
        <h2 className="section-title mb-16 text-center">
          <Mail className="h-8 w-8 text-accent mr-2" />
          <span>Get In Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-card p-6 animate-scale-in">
            <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="How can I help you?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-3 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="glass-card p-6 mb-6 animate-scale-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-foreground/80 mb-1">Email</p>
                  <a 
                    href="mailto:hello@johndoe.com" 
                    className="text-accent hover:underline"
                  >
                    paritoshsharma072000@gmail.com
                  </a>
                </div>
                
                <div>
                  <p className="text-foreground/80 mb-1">Location</p>
                  <p>Gurugram, Haryana</p>
                </div>
                
                <div>
                  <p className="text-foreground/80 mb-1">Availability</p>
                  <p>Open for consulting & speaking engagements</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 animate-scale-in" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              
              <div className="flex flex-col space-y-4">
                <a 
                  href="https://www.linkedin.com/in/paritosh-sharma-74b4ba17a/" 
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
                
                <a 
                  href="https://github.com/paritosh0707" 
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
                
                <a 
                  href="https://twitter.com/username" 
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  <span>Twitter</span>
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>Newsletter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
