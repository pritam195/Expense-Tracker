import React from 'react';

const testimonials = [
    {
        name: 'Aarav Sharma',
        image: 'https://i.pravatar.cc/150?img=3',
        review:
            'This app helped me realize how much I was overspending on food and subscriptions. Now I save at least ₹5,000 every month!',
    },
    {
        name: 'Priya Desai',
        image: 'https://i.pravatar.cc/150?img=5',
        review:
            'The EMI reminders and expense breakdown are a lifesaver. It keeps me disciplined and organized financially.',
    },
    {
        name: 'Rahul Mehta',
        image: 'https://i.pravatar.cc/150?img=10',
        review:
            'I used to forget who I owed or who owed me — now it’s all tracked perfectly with this app. Highly recommended!',
    },
];

const AboutUsSection = () => {
    return (
        <div className="bg-gray-50 py-20 px-6 md:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
                About Us
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
                Our mission is to help people become more aware of their spending, save more, and live financially confident lives. Here's what our users have to say:
            </p>

            <div className="grid gap-8 md:grid-cols-3">
                {testimonials.map((user, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center">
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{user.name}</h3>
                        <p className="text-gray-600 text-sm">{user.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutUsSection;
