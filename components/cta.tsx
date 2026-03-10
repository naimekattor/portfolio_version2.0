'use client';

export function CTA() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="bg-primary-600 rounded-[2rem] p-12 md:p-20 text-center text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's build scalable<br />products together</h2>
            <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
              Currently accepting new projects and full-time opportunities. Let's discuss how I can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-all">
                Schedule a Call
              </button>
              <button className="px-8 py-4 bg-primary-700 text-white font-bold rounded-xl hover:bg-primary-800 transition-all ">
                Send an Email
              </button>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[120px]"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-400 rounded-full blur-[120px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
