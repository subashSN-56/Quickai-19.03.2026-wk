import React from 'react';
import subash from '../image/subash.png';
import Roshan from '../image/Roshan.jpeg';
import karthikeyan from '../image/karthickeyan.jpeg';

const Testimonial = () => {
    const [tooltip, setTooltip] = React.useState({
        visible: false,
        x: 0,
        y: 0,
        text: '',
    });

    const wrapperRef = React.useRef(null);

    const testimonials = [
        {
            name: 'SUBASH D',
            title: 'Full Stack Engineer , Founder of QuickAI',
           message:
  'I am a Full Stack Engineer who loves turning ideas into real-world applications with seamless user experience and powerful backend logic.',
            image: subash,
        },
        {
            name: 'Kiruthick Roshan A',
            title: 'Frontend Developer , Co-Founder of QuickAI',
            message:
  'Frontend Developer skilled in building responsive, user-friendly interfaces using modern technologies and best UI/UX practices.',
            image: Roshan,
        },
        {
            name: 'Karthikeyan U',
            title: 'UX/UI Designer & QA Tester',
            message: 'Focused on delivering intuitive user experiences and ensuring high-quality, bug-free applications.',
            image: karthikeyan,
        },
        {
            name: 'Aslam A',
            title: 'UX/UI Designer & QA Tester',
            message: 'Focused on delivering intuitive user experiences and ensuring high-quality, bug-free applications.',
            image: karthikeyan,
        },
    ];

    const handleMouseMove = (e, index) => {
        if (!wrapperRef.current) return;
        const bounds = wrapperRef.current.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: e.clientX - bounds.left + 8,
            y: e.clientY - bounds.top + 8,
            text: testimonials[index].name,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    return (
        <div ref={wrapperRef} className="relative">
            <h1 className="text-center text-4xl font-bold text-gray-900">QuickAI Full Stack Developer</h1>
            <p className="text-center text-gray-500 mt-1">
                QuickAI is a powerful platform designed to simplify development and deliver intelligent, scalable solutions.
            </p>

            {/* Global Tooltip */}
            {tooltip.visible && (
                <span
                    className="absolute px-2.5 py-1 text-sm rounded bg-indigo-500 text-white pointer-events-none z-50"
                    style={{
                        top: tooltip.y,
                        left: tooltip.x,
                        transition: 'all 0.2s ease-out',
                    }}
                >
                    {tooltip.text}
                </span>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 py-16">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={handleMouseLeave}
                        className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <div className="mb-4 text-gray-500">
                                <h3 className="text-lg font-semibold text-gray-900"> 💫 Passionate about coding 💛</h3>
                                <p className="my-4 text-sm line-clamp-3">{testimonial.message}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    className="rounded-full w-9 h-9"
                                    src={testimonial.image}
                                    alt={`${testimonial.name} profile`}
                                    aria-label={`${testimonial.name}, ${testimonial.title}`}
                                />
                                <div className="space-y-0.5 font-medium text-left ml-3">
                                    <p>{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
