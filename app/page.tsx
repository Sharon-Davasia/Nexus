'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Code, Rocket } from 'lucide-react';
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/design-system/motion';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 gradient-mesh opacity-30" />
                <div className="absolute inset-0 gradient-animate opacity-20" />

                <motion.div
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div
                        variants={staggerItemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                            The future of software development
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={staggerItemVariants}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    >
                        Transform Ideas Into
                        <br />
                        <span className="text-gradient">Production-Ready Apps</span>
                    </motion.h1>

                    <motion.p
                        variants={staggerItemVariants}
                        className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
                    >
                        Nexus is an AI-powered platform that transforms natural language into deployed,
                        full-stack applications. Build faster, ship sooner, and focus on what matters.
                    </motion.p>

                    <motion.div
                        variants={staggerItemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/builder">
                            <motion.button
                                className="group px-8 py-4 rounded-lg gradient-primary text-white font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Building for Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>

                        <Link href="#demo">
                            <motion.button
                                className="px-8 py-4 rounded-lg glass border border-white/10 text-white font-semibold text-lg hover:border-white/20 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Watch Demo
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={staggerItemVariants}
                        className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                    >
                        {[
                            { label: 'Apps Built', value: '10,000+' },
                            { label: 'Active Users', value: '5,000+' },
                            { label: 'Time Saved', value: '100hrs' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <motion.div
                            className="w-1.5 h-1.5 bg-white rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-4">Built for Speed</h2>
                        <p className="text-xl text-muted-foreground">
                            Everything you need to go from idea to production
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: 'Lightning Fast',
                                description: 'Generate complete applications in minutes, not weeks. Our AI understands your requirements and builds accordingly.',
                            },
                            {
                                icon: Code,
                                title: 'Production Ready',
                                description: 'Get clean, maintainable code with best practices built in. Authentication, database, and APIs configured.',
                            },
                            {
                                icon: Rocket,
                                title: 'One-Click Deploy',
                                description: 'Deploy directly to Vercel or Netlify with a single click. GitHub integration included.',
                            },
                        ].map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={i}
                                    className="glass p-8 rounded-2xl border border-white/10 hover-lift"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -4 }}
                                >
                                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto text-center glass p-12 rounded-3xl border border-white/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Build Something Amazing?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Join thousands of developers and founders building faster with Nexus.
                    </p>
                    <Link href="/builder">
                        <motion.button
                            className="px-8 py-4 rounded-lg gradient-primary text-white font-semibold text-lg inline-flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
