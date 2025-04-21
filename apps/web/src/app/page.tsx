import Image from "next/image";
import Link from "next/link";
import {
	Check,
	Upload,
	BarChart3,
	PieChart,
	ArrowRight,
	ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-[#d7f7e8]">
			{/* Header */}
			<header className="container mx-auto py-4 px-4 flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="bg-green-500 rounded-full p-1.5">
						<Check className="h-5 w-5 text-white" />
					</div>
					<span className="text-xl font-bold">AltScore</span>
				</div>
				<nav className="hidden md:flex gap-8">
					<Link href="#features" className="text-gray-700 hover:text-green-600">
						Features
					</Link>
					<Link
						href="#how-it-works"
						className="text-gray-700 hover:text-green-600"
					>
						How It Works
					</Link>
					<Link href="#faq" className="text-gray-700 hover:text-green-600">
						FAQ
					</Link>
				</nav>
				<div className="flex gap-4">
					<Link href="/login">
						<Button
							variant="outline"
							className="border-green-600 text-green-600 hover:bg-green-50"
						>
							Login
						</Button>
					</Link>
					<Link href="/signup">
						<Button className="bg-green-600 hover:bg-green-700 text-white">
							Sign Up
						</Button>
					</Link>
				</div>
			</header>

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<h1 className="text-4xl md:text-5xl font-bold leading-tight">
							Understand Your Financial Health With Just a Statement
						</h1>
						<p className="text-lg text-gray-700">
							Upload your bank or M-Pesa statements and get instant insights
							into your financial health, credit score, and personalized
							recommendations.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Link href="/signup">
								<Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg w-full sm:w-auto">
									Get Started <ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</Link>
							<Link href="#how-it-works">
								<Button
									variant="outline"
									className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg w-full sm:w-auto"
								>
									Learn More
								</Button>
							</Link>
						</div>
					</div>
					<div className="relative rounded-xl overflow-hidden shadow-2xl">
						<Image
							src="/images/dashboard.png"
							alt="AltScore Dashboard"
							width={600}
							height={400}
							className="w-full h-auto"
						/>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="bg-white py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div className="space-y-2">
							<p className="text-3xl md:text-4xl font-bold text-green-600">
								10K+
							</p>
							<p className="text-gray-600">Active Users</p>
						</div>
						<div className="space-y-2">
							<p className="text-3xl md:text-4xl font-bold text-green-600">
								98%
							</p>
							<p className="text-gray-600">Accuracy Rate</p>
						</div>
						<div className="space-y-2">
							<p className="text-3xl md:text-4xl font-bold text-green-600">
								5M+
							</p>
							<p className="text-gray-600">Transactions Analyzed</p>
						</div>
						<div className="space-y-2">
							<p className="text-3xl md:text-4xl font-bold text-green-600">
								30s
							</p>
							<p className="text-gray-600">Average Analysis Time</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="container mx-auto px-4 py-16 md:py-24">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Powerful Financial Insights
					</h2>
					<p className="text-lg text-gray-700 max-w-2xl mx-auto">
						AltScore provides comprehensive analysis of your financial data,
						helping you make better decisions.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-white p-8 rounded-xl shadow-md">
						<div className="bg-green-100 p-3 rounded-full w-fit mb-4">
							<BarChart3 className="h-6 w-6 text-green-600" />
						</div>
						<h3 className="text-xl font-bold mb-3">Financial Score</h3>
						<p className="text-gray-700">
							Get your personalized credit score based on your transaction
							history and spending patterns.
						</p>
					</div>

					<div className="bg-white p-8 rounded-xl shadow-md">
						<div className="bg-green-100 p-3 rounded-full w-fit mb-4">
							<PieChart className="h-6 w-6 text-green-600" />
						</div>
						<h3 className="text-xl font-bold mb-3">Spending Analytics</h3>
						<p className="text-gray-700">
							Visualize your income vs expenses, track your savings rate, and
							identify spending patterns.
						</p>
					</div>

					<div className="bg-white p-8 rounded-xl shadow-md">
						<div className="bg-green-100 p-3 rounded-full w-fit mb-4">
							<Upload className="h-6 w-6 text-green-600" />
						</div>
						<h3 className="text-xl font-bold mb-3">Easy Document Upload</h3>
						<p className="text-gray-700">
							Simply upload your bank or M-Pesa statements and let our system do
							the analysis for you.
						</p>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section id="how-it-works" className="bg-white py-16 md:py-24">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							How It Works
						</h2>
						<p className="text-lg text-gray-700 max-w-2xl mx-auto">
							Get started with AltScore in just three simple steps
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						<div className="text-center">
							<div className="bg-green-600 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
								1
							</div>
							<h3 className="text-xl font-bold mb-2">Create an Account</h3>
							<p className="text-gray-700">
								Sign up for free and set up your secure profile
							</p>
						</div>

						<div className="text-center">
							<div className="bg-green-600 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
								2
							</div>
							<h3 className="text-xl font-bold mb-2">Upload Statements</h3>
							<p className="text-gray-700">
								Upload your bank or M-Pesa statements securely
							</p>
						</div>

						<div className="text-center">
							<div className="bg-green-600 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
								3
							</div>
							<h3 className="text-xl font-bold mb-2">Get Insights</h3>
							<p className="text-gray-700">
								Receive your financial score and detailed analytics
							</p>
						</div>
					</div>

					<div className="mt-16 text-center">
						<Link href="/signup">
							<Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
								Try It Now <ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Screenshot Section */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="order-2 md:order-1">
						<Image
							src="/images/documents.png"
							alt="Document Management"
							width={600}
							height={400}
							className="rounded-xl shadow-2xl w-full h-auto"
						/>
					</div>
					<div className="space-y-6 order-1 md:order-2">
						<h2 className="text-3xl md:text-4xl font-bold">
							Effortless Document Management
						</h2>
						<p className="text-lg text-gray-700">
							Upload and manage all your financial statements in one secure
							place. AltScore supports both bank statements and M-Pesa
							statements, giving you a comprehensive view of your finances.
						</p>
						<ul className="space-y-4">
							{[
								"Secure document storage",
								"Support for multiple statement formats",
								"Automatic data extraction",
								"Historical tracking and comparison",
							].map((item, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<li key={i} className="flex items-start gap-2">
									<div className="bg-green-500 rounded-full p-1 mt-1">
										<Check className="h-3 w-3 text-white" />
									</div>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="bg-white py-16 md:py-24">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							What Our Users Say
						</h2>
						<p className="text-lg text-gray-700 max-w-2xl mx-auto">
							Join thousands of satisfied users who have improved their
							financial health with AltScore
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{[
							{
								quote:
									"AltScore helped me understand my spending habits and improve my savings rate by 15% in just two months.",
								name: "Sarah K.",
								title: "Small Business Owner",
							},
							{
								quote:
									"The insights from my M-Pesa statements were eye-opening. I never realized how much I was spending on certain categories.",
								name: "James M.",
								title: "Software Developer",
							},
							{
								quote:
									"I was able to improve my credit score by following the personalized recommendations from AltScore.",
								name: "Lucy W.",
								title: "Marketing Professional",
							},
						].map((testimonial, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<div key={i} className="bg-green-50 p-8 rounded-xl">
								<p className="italic mb-6">"{testimonial.quote}"</p>
								<div>
									<p className="font-bold">{testimonial.name}</p>
									<p className="text-gray-600 text-sm">{testimonial.title}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section id="faq" className="container mx-auto px-4 py-16 md:py-24">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-lg text-gray-700 max-w-2xl mx-auto">
						Find answers to common questions about AltScore
					</p>
				</div>

				<div className="max-w-3xl mx-auto space-y-6">
					{[
						{
							q: "Is my financial data secure?",
							a: "Yes, we use bank-level encryption to protect your data. We never share your information with third parties without your explicit consent.",
						},
						{
							q: "Which banks and financial institutions do you support?",
							a: "We support all major banks in Kenya and M-Pesa statements. If you have a specific institution in mind, please contact us.",
						},
						{
							q: "How accurate is the financial score?",
							a: "Our algorithm has been trained on millions of transactions with a 98% accuracy rate. Your score is updated in real-time as new data is added.",
						},
						{
							q: "Can I delete my data?",
							a: "Yes, you have complete control over your data. You can delete your statements and account information at any time.",
						},
						{
							q: "Is AltScore free to use?",
							a: "We offer a free basic plan with limited features. Premium plans with advanced analytics and recommendations are available for a monthly subscription.",
						},
					].map((faq, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={i} className="bg-white p-6 rounded-xl shadow-sm">
							<div className="flex justify-between items-center">
								<h3 className="text-lg font-bold">{faq.q}</h3>
								<ChevronRight className="h-5 w-5 text-green-600" />
							</div>
							<p className="mt-2 text-gray-700">{faq.a}</p>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-green-600 py-16">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
						Ready to Take Control of Your Finances?
					</h2>
					<p className="text-lg text-green-50 max-w-2xl mx-auto mb-8">
						Join thousands of users who have improved their financial health
						with AltScore
					</p>
					<Link href="/signup">
						<Button className="bg-white text-green-600 hover:bg-green-50 px-8 py-6 text-lg">
							Get Started for Free
						</Button>
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-white py-12">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<div className="bg-green-500 rounded-full p-1.5">
									<Check className="h-5 w-5 text-white" />
								</div>
								<span className="text-xl font-bold">AltScore</span>
							</div>
							<p className="text-gray-600">
								Empowering financial decisions through data-driven insights.
							</p>
						</div>

						<div>
							<h3 className="font-bold mb-4">Product</h3>
							<ul className="space-y-2">
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Features
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Pricing
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Testimonials
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										FAQ
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-bold mb-4">Company</h3>
							<ul className="space-y-2">
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										About Us
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Careers
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Blog
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Contact
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-bold mb-4">Legal</h3>
							<ul className="space-y-2">
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Terms of Service
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Data Policy
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-green-600">
										Cookie Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-600">
							© {new Date().getFullYear()} AltScore. All rights reserved.
						</p>
						<div className="flex gap-4 mt-4 md:mt-0">
							<Link href="#" className="text-gray-600 hover:text-green-600">
								Twitter
							</Link>
							<Link href="#" className="text-gray-600 hover:text-green-600">
								Facebook
							</Link>
							<Link href="#" className="text-gray-600 hover:text-green-600">
								Instagram
							</Link>
							<Link href="#" className="text-gray-600 hover:text-green-600">
								LinkedIn
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
