using Backend.Models;
using Bogus;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public partial class DatabaseContext
{
    public static List<User> _users = [];
    public static List<Project> _projects = [];
    public static List<Tag> _tags = [];

    internal bool PopulateDatabase(int count = 100)
    {

            var (seededProjects, seededUsers, seededTags) = GenerateData(count);

            Users.AddRange(seededUsers);
            Projects.AddRange(seededProjects);
            Tags.AddRange(seededTags);
            SaveChanges();

            SeedCollaborators();

            return true;
    }

    internal (List<Project>, List<User>, List<Tag>) GenerateData(int count)
    {
        SeedUsers(count * 2);
        SeedProjects(count);

        return (_projects, _users, _tags);
    }

    internal static void SeedUsers(int count)
    {
        for (int i = 0; i < count; i++)
        {
            Random random = new();

            var fakedTags = CreateFakeTags(random);

            var authorId = Guid.NewGuid().ToString();
            var fakedUser = CreateFakeUser(authorId, fakedTags);

            _users.Add(fakedUser);
        }
    }

    internal static void SeedProjects(int count)
    {
        for (int i = 0; i < count; i++)
        {
            Random random = new();

            var user = _users[random.Next(_users.Count)];

            var fakedTags = CreateFakeTags(random);

            var fakedProject = CreateFakeProject(user, user.ClerkId, fakedTags);

            user.Projects.Add(fakedProject);

            _projects.Add(fakedProject);
            _tags.AddRange(fakedTags);
        }
    }

    internal void SeedCollaborators()
    {
        var projects = Projects.Include(p => p.Collaborators).ToList();
        var users = Users.Include(u => u.Projects).ToList();

        foreach (var project in projects)
        {
            Random random = new();

            for (int i = 0; i < 5; i++)
            {
                var user = users.ElementAt(random.Next(users.Count - 1));
                var collaborator = new Collaborator {
                    UserId = user.ClerkId,
                    User = user
                };
                // if (project.AuthorId == user.ClerkId) continue;
                // if (project.Collaborators.Count != 0 && project.Collaborators.Any(u => u.ClerkId == user.ClerkId)) continue;
                project.Collaborators.Add(collaborator);
                user.ProjectCollaborateds.Add(new ProjectCollaborated {Project = project, ProjectId = project.Id});
                SaveChanges();
            }
        }
    }

    private static User CreateFakeUser(string authorId, List<Tag> fakedTags)
    {
        var userFaker = new Faker<User>()
                .RuleFor(u => u.ClerkId, f => authorId)
                .RuleFor(u => u.Name, f => f.Name.FirstName())
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.Tags, f => fakedTags);

        return userFaker.Generate();
    }

    private static List<Tag> CreateFakeTags(Random random)
    {
        int skillsAmount = random.Next(6);
        int interestsAmount = random.Next(6);

        List<Tag> fakedTags = [];

        List<string> skills = ["Data", "Art", "C#", "Tim", "JS", "Java"];
        for (int j = 0; j < skillsAmount; j++)
        {
            int index = random.Next(skills.Count);
            var tagFaker = new Faker<Tag>()
                .RuleFor(t => t.TagValue, v => skills[index])
                .RuleFor(t => t.IsSkill, v => true);

            fakedTags.Add(tagFaker.Generate());
            skills.RemoveAt(index);
        }

        List<string> interests = ["Data", "Art", "C#", "Tim", "JS", "Java"];
        for (int j = 0; j < interestsAmount; j++)
        {
            int index = random.Next(interests.Count);
            var tagFake2r = new Faker<Tag>()
                .RuleFor(t => t.TagValue, v => interests[index])
                .RuleFor(t => t.IsSkill, v => false);

            fakedTags.Add(tagFake2r.Generate());
            interests.RemoveAt(index);
        }

        return fakedTags;
    }

    private static Project CreateFakeProject(User fakedUser, string authorId, List<Tag> fakedTags)
    {
        List<string> projectTitles = [
        "Smart Home Automation System",
        "AI-Powered Personal Assistant",
        "Blockchain-Based Voting Platform",
        "Augmented Reality Navigation App",
        "Machine Learning Image Recognition Tool",
        "Cryptocurrency Portfolio Tracker",
        "Virtual Reality Fitness Trainer",
        "IoT Weather Station",
        "Natural Language Processing Chatbot",
        "Drone Delivery Management System",
        "Quantum Computing Simulator",
        "Biometric Authentication System",
        "3D Printed Prosthetics Designer",
        "Renewable Energy Monitoring Dashboard",
        "Cybersecurity Threat Detection Tool",
        "Autonomous Vehicle Control System",
        "Genetic Algorithm Optimization Solver",
        "Cloud-Based File Sharing Service",
        "Facial Recognition Attendance System",
        "Robotic Process Automation Framework",
        "Sentiment Analysis for Social Media",
        "Predictive Maintenance for Industrial Equipment",
        "Gesture-Controlled Smart TV Interface",
        "Blockchain Supply Chain Tracker",
        "AI-Driven Financial Advisor",
        "Augmented Reality Art Installation",
        "Machine Learning Music Composer",
        "Decentralized Social Network",
        "Virtual Reality Museum Tour",
        "IoT-Based Smart Agriculture System",
        "Natural Language Processing Translation Tool",
        "Drone Swarm Coordination Algorithm",
        "Quantum Cryptography Communication System",
        "Biometric-Enabled Payment Platform",
        "3D City Modeling and Visualization",
        "Solar Panel Efficiency Optimizer",
        "Cybersecurity Training Simulator",
        "Autonomous Robot Navigation System",
        "Evolutionary Algorithm Problem Solver",
        "Serverless Computing Platform",
        "Facial Emotion Recognition App",
        "AI-Powered Code Generator",
        "Sentiment-Based Stock Trading Bot",
        "Predictive Analytics for Healthcare",
        "Voice-Controlled Smart Home Hub",
        "Blockchain-Based Identity Management",
        "AI Art Style Transfer Tool",
        "Augmented Reality Interior Designer",
        "Machine Learning Recommendation Engine",
        "Decentralized File Storage System",
        "Virtual Reality Therapy Platform",
        "IoT-Enabled Smart City Dashboard",
        "Natural Language Processing Summarizer",
        "Swarm Robotics Simulation",
        "Quantum Machine Learning Algorithm",
        "Biometric Access Control System",
        "3D Holographic Display Interface",
        "Tidal Energy Harvesting Optimizer",
        "Cybersecurity Vulnerability Scanner",
        "Autonomous Drone Delivery Network",
        "Genetic Programming Code Evolver",
        "Edge Computing Framework",
        "Facial Recognition Security Camera",
        "AI-Driven Customer Service Bot",
        "Sentiment Analysis for Product Reviews",
        "Predictive Maintenance for Smart Grids",
        "Gesture-Based Sign Language Translator",
        "Blockchain Voting System",
        "AI-Powered Video Editor",
        "Augmented Reality Educational Platform",
        "Machine Learning Anomaly Detector",
        "Decentralized Marketplace",
        "Virtual Reality Social Network",
        "IoT-Based Traffic Management System",
        "Natural Language Processing Question Answering System",
        "Multi-Agent Reinforcement Learning Environment",
        "Quantum Error Correction Algorithm",
        "Biometric Health Monitoring Wearable",
        "3D Bioprinting Tissue Engineering Tool",
        "Wave Energy Converter Optimizer",
        "Cybersecurity Incident Response Simulator",
        "Autonomous Underwater Vehicle Control System",
        "Neuroevolution AI Training Platform",
        "Fog Computing Architecture",
        "Facial Recognition Attendance Tracker",
        "AI-Powered Legal Document Analyzer",
        "Sentiment-Based Music Playlist Generator",
        "Predictive Analytics for Supply Chain",
        "Brain-Computer Interface Controller",
        "Blockchain-Based Intellectual Property Registry",
        "AI Ethics Compliance Checker",
        "Augmented Reality Surgical Assistant",
        "Machine Learning Drug Discovery Platform",
        "Decentralized Energy Trading System",
        "Virtual Reality Emergency Response Trainer",
        "IoT-Enabled Waste Management Solution",
        "Natural Language Processing Fake News Detector",
        "Swarm Intelligence Optimization Algorithm",
        "Quantum Random Number Generator"
        ];

        List<string> projectDescriptions = [
        "Develop a sophisticated machine learning algorithm to predict stock market trends by analyzing historical data, news sentiment, and economic indicators. The system will use deep learning techniques to identify patterns and provide actionable insights for investors.",
        "Create a blockchain-based voting system for secure elections that ensures transparency, immutability, and voter privacy. The platform will include features like voter authentication, real-time result tracking, and audit trails to enhance democratic processes.",
        "Design an AI-powered personal assistant for smart homes that can control IoT devices, manage schedules, and provide personalized recommendations. The assistant will use natural language processing to understand complex commands and machine learning to adapt to user preferences over time.",
        "Build a virtual reality platform for immersive language learning that simulates real-world scenarios in different cultures. Users can practice conversations with AI-driven characters, explore virtual cities, and engage in interactive lessons to accelerate language acquisition.",
        "Implement a facial recognition system for automated attendance tracking in educational institutions and workplaces. The system will use deep learning algorithms to identify individuals, record attendance in real-time, and generate comprehensive reports for administrators.",
        "Develop a quantum computing simulator for educational purposes that allows students and researchers to experiment with quantum algorithms without access to actual quantum hardware. The simulator will include visualizations of quantum states and interactive tutorials on quantum concepts.",
        "Create an augmented reality app for interactive museum tours that overlays digital information on physical exhibits. Users can access detailed explanations, 3D models, and historical context by pointing their devices at artifacts, enhancing the museum experience.",
        "Design a neural network for real-time object detection in video streams, capable of identifying and tracking multiple objects simultaneously. This system could be applied in autonomous vehicles, surveillance, and robotics to improve safety and efficiency.",
        "Build a decentralized social media platform using blockchain technology that prioritizes user privacy and data ownership. The platform will feature end-to-end encryption, content monetization options, and resistance to censorship and central control.",
        "Implement an IoT system for smart agriculture and crop monitoring that uses sensors to collect data on soil moisture, temperature, and nutrient levels. The system will provide farmers with real-time insights and automated irrigation controls to optimize crop yields.",
        "Develop a natural language processing tool for sentiment analysis that can analyze text from various sources like social media, customer reviews, and news articles. The tool will provide businesses with insights into public opinion and brand perception.",
        "Create a machine learning model for predicting customer churn by analyzing historical customer data, interaction patterns, and external factors. This model will help businesses proactively identify at-risk customers and implement retention strategies.",
        "Design a robotic process automation system for business workflows that can automate repetitive tasks across multiple applications. The system will use AI to learn from human actions and continuously improve its efficiency in handling complex processes.",
        "Build a cryptocurrency trading bot using reinforcement learning that can analyze market trends, execute trades, and manage risk autonomously. The bot will adapt its strategies based on market conditions and historical performance.",
        "Implement a voice-controlled smart home system using NLP that can understand and execute complex commands across multiple connected devices. The system will learn user preferences and routines to provide a personalized home automation experience.",
        "Develop an AI-powered chatbot for customer support that can handle multiple languages, understand context, and provide accurate responses to customer queries. The chatbot will integrate with existing CRM systems and learn from each interaction to improve its performance.",
        "Create a computer vision system for autonomous vehicle navigation that can detect and classify objects, read traffic signs, and make real-time decisions in various driving conditions. The system will prioritize safety and efficiency in urban and highway environments.",
        "Design a blockchain-based supply chain management solution that provides end-to-end visibility and traceability for products. The system will include features like smart contracts for automated payments and real-time inventory tracking.",
        "Build a recommendation engine using collaborative filtering and content-based algorithms to provide personalized product or content suggestions. The engine will analyze user behavior, preferences, and item characteristics to improve recommendation accuracy.",
        "Implement a gesture recognition system for sign language translation that can interpret hand movements and facial expressions in real-time. The system will use machine learning to improve accuracy and support multiple sign languages.",
        "Develop a predictive maintenance system for industrial equipment using IoT sensors and machine learning algorithms. The system will analyze sensor data to predict potential failures, schedule maintenance, and optimize equipment performance.",
        "Create a virtual reality therapy platform for treating phobias and anxiety disorders through immersive exposure therapy. The platform will include customizable scenarios, progress tracking, and integration with biometric sensors for monitoring patient responses.",
        "Design a machine learning model for fraud detection in financial transactions that can identify unusual patterns and flag potentially fraudulent activities in real-time. The model will adapt to new fraud techniques and minimize false positives.",
        "Build an AI-powered resume screening and candidate ranking system that can analyze resumes, cover letters, and online profiles to identify the best candidates for job openings. The system will use natural language processing to understand job requirements and match them with candidate qualifications.",
        "Implement a blockchain-based digital identity verification system that allows users to securely store and share their personal information. The system will use zero-knowledge proofs to enable selective disclosure of information and reduce the risk of identity theft.",
        "Develop a natural language generation system for automated content creation that can produce human-like articles, reports, and social media posts. The system will use advanced language models and topic understanding to generate coherent and contextually relevant content.",
        "Create an augmented reality navigation app for indoor spaces such as shopping malls, airports, and museums. The app will use computer vision and AI to provide real-time directions, points of interest, and personalized recommendations based on user preferences.",
        "Design a deep learning model for medical image analysis and diagnosis that can detect abnormalities in X-rays, MRIs, and CT scans. The model will assist radiologists in early detection of diseases and provide detailed reports to support clinical decision-making.",
        "Build a decentralized file storage system using blockchain technology that ensures data integrity, privacy, and resistance to censorship. The system will use distributed storage nodes and encryption to provide secure and efficient file sharing and storage.",
        "Implement a swarm robotics system for collaborative tasks in warehouses or disaster response scenarios. The system will coordinate multiple autonomous robots to work together efficiently, adapting to changing environments and task requirements.",
        "Develop an AI-powered personal fitness coach and meal planner that creates customized workout routines and nutrition plans based on individual goals, preferences, and health data. The system will use machine learning to adapt recommendations over time.",
        "Create a machine learning model for predicting energy consumption in smart cities. The model will analyze data from IoT sensors, weather patterns, and historical usage to optimize energy distribution and promote sustainable resource management.",
        "Design a quantum cryptography system for secure communication that leverages the principles of quantum mechanics to create unbreakable encryption. The system will include quantum key distribution protocols and integration with existing communication infrastructure.",
        "Build a virtual reality social platform for remote collaboration that simulates physical workspaces and enables natural interactions between team members. The platform will support 3D object manipulation, whiteboarding, and spatial audio for immersive meetings.",
        "Implement an AI system for automated code generation and optimization that can convert high-level specifications into efficient, bug-free code across multiple programming languages. The system will use machine learning to improve code quality and reduce development time.",
        "Develop a blockchain-based platform for peer-to-peer energy trading in microgrids. The platform will enable prosumers to buy and sell excess renewable energy, use smart contracts for automated transactions, and optimize local energy distribution.",
        "Create a computer vision system for real-time emotion recognition in video streams. The system will analyze facial expressions, body language, and voice tone to determine emotional states, with applications in market research, mental health monitoring, and human-computer interaction.",
        "Design a machine learning model for predictive maintenance in aviation that analyzes sensor data from aircraft components to forecast potential failures. The model will help airlines optimize maintenance schedules, reduce downtime, and enhance flight safety.",
        "Build an AI-powered music composition and generation system that can create original pieces in various genres and styles. The system will use deep learning to understand musical structures and generate coherent, emotionally resonant compositions.",
        "Implement a natural language processing system for automated text summarization that can condense long documents, articles, and reports into concise, informative summaries. The system will preserve key information and maintain context across various domains.",
        "Develop a virtual reality surgical simulation platform for medical training that provides realistic, haptic feedback and anatomically accurate 3D models. The platform will allow surgeons to practice complex procedures in a risk-free environment.",
        "Create a blockchain-based system for verifying academic credentials that allows educational institutions to issue tamper-proof digital certificates. The system will enable instant verification by employers and reduce fraud in academic qualifications.",
        "Design an AI model for personalized learning and adaptive education that tailors content and pacing to individual student needs. The model will analyze learning patterns, identify knowledge gaps, and provide targeted recommendations to optimize learning outcomes.",
        "Build a computer vision system for automated quality control in manufacturing that can detect defects and anomalies in products on assembly lines. The system will use high-speed cameras and machine learning to improve production efficiency and reduce waste.",
        "Implement a machine learning model for predicting traffic patterns and optimizing urban transportation. The model will analyze real-time data from traffic sensors, GPS devices, and historical patterns to suggest optimal routes and reduce congestion.",
        "Develop an AI-powered system for automated video editing and production that can analyze raw footage, identify key moments, and create compelling video content. The system will understand narrative structures and apply appropriate editing techniques.",
        "Create a blockchain-based platform for transparent charity donations that allows donors to track how their contributions are used. The platform will use smart contracts to ensure funds are allocated as intended and provide real-time impact reporting.",
        "Design a natural language processing system for automated language translation that can handle idiomatic expressions, maintain context, and preserve tone across multiple languages. The system will use neural machine translation and continual learning to improve accuracy.",
        "Build an augmented reality system for architectural visualization that allows users to see 3D models of buildings and interiors in real-world environments. The system will support real-time modifications and collaborative design sessions.",
        "Implement a machine learning model for predictive policing and crime prevention that analyzes historical crime data, social factors, and environmental conditions to identify high-risk areas and times. The model will assist law enforcement in resource allocation and community engagement strategies.",
        "Develop a quantum machine learning algorithm for optimization problems in logistics and supply chain management. The algorithm will leverage quantum computing principles to solve complex routing and scheduling problems more efficiently than classical methods.",
        "Create a virtual reality platform for remote property tours that allows potential buyers or renters to explore homes and commercial spaces in immersive 3D environments. The platform will include interactive features and real-time communication with agents.",
        "Design an AI system for automated financial planning and investment advice that analyzes personal financial data, market trends, and risk profiles to provide tailored recommendations. The system will adapt to changing economic conditions and user goals.",
        "Build a blockchain-based platform for secure and transparent online voting in corporate governance. The system will ensure voter anonymity, prevent double-voting, and provide real-time auditable results for shareholder meetings and board elections.",
        "Implement a computer vision system for automated plant disease detection in agriculture. The system will use drones and satellite imagery to identify crop health issues early, enabling targeted interventions and reducing pesticide use.",
        "Develop a machine learning model for personalized product recommendations in e-commerce that considers user behavior, preferences, and contextual factors. The model will improve conversion rates and customer satisfaction through highly relevant suggestions.",
        "Create an AI-powered system for automated news generation and reporting that can gather information from multiple sources, verify facts, and produce coherent articles in various styles. The system will assist journalists and news organizations in covering a wide range of topics efficiently.",
        "Design a blockchain-based platform for decentralized cloud storage that ensures data privacy, redundancy, and cost-effectiveness. The platform will use smart contracts to manage storage allocation and payments between users and storage providers.",
        "Build a natural language processing system for intent recognition in chatbots and virtual assistants. The system will accurately interpret user queries, handle complex dialogue flows, and provide context-aware responses across multiple domains.",
        "Implement a machine learning model for predicting solar energy production that considers weather patterns, panel efficiency, and geographical factors. The model will help optimize energy grid management and improve the integration of renewable energy sources.",
        "Develop an AI system for automated drug discovery and development that can analyze molecular structures, predict drug interactions, and optimize compound designs. The system will accelerate the pharmaceutical research process and reduce costs in bringing new drugs to market.",
        "Create a virtual reality platform for immersive historical reenactments that allows users to experience significant events from different perspectives. The platform will combine historical research, 3D modeling, and interactive storytelling for educational purposes.",
        "Design a blockchain-based system for secure medical record management that ensures patient privacy, interoperability between healthcare providers, and easy access for authorized personnel. The system will improve continuity of care and reduce administrative overhead.",
        "Build a computer vision system for automated facial recognition in security systems that can identify individuals in crowded environments, track movements, and detect suspicious behavior. The system will prioritize privacy concerns and ethical use of the technology.",
        "Implement a machine learning model for predicting customer lifetime value in subscription-based businesses. The model will analyze user engagement, payment history, and external factors to optimize customer retention strategies and marketing efforts.",
        "Develop an AI-powered system for automated legal document analysis that can review contracts, identify potential issues, and suggest modifications. The system will assist lawyers in due diligence processes and contract management.",
        "Create a blockchain-based platform for decentralized social impact investing that connects investors with sustainable projects worldwide. The platform will use smart contracts to ensure transparency in fund allocation and impact reporting.",
        "Design a natural language processing system for automated essay grading that can evaluate writing quality, argument structure, and content relevance across various subjects. The system will provide detailed feedback to students and assist educators in managing large-scale assessments.",
        "Build an augmented reality system for interactive product manuals that overlays step-by-step instructions and 3D visualizations on physical objects. The system will improve user experience in assembly, maintenance, and troubleshooting tasks.",
        "Implement a machine learning model for predictive maintenance in smart cities that analyzes data from IoT sensors on infrastructure such as bridges, roads, and buildings. The model will help prioritize maintenance tasks and prevent costly failures.",
        "Develop a quantum computing algorithm for portfolio optimization in financial markets that can analyze vast numbers of potential investment combinations simultaneously. The algorithm will provide more efficient and accurate asset allocation strategies for fund managers.",
        "Create a virtual reality platform for immersive art creation and exhibition that allows artists to sculpt, paint, and design in 3D space. The platform will enable virtual galleries and collaborative art projects accessible to a global audience.",
        "Design an AI system for automated wildlife monitoring and conservation that uses computer vision and acoustic analysis to track animal populations, detect poaching activities, and assess ecosystem health in protected areas.",
        "Build a blockchain-based platform for transparent and ethical supply chains that tracks the origin and journey of products from raw materials to end consumers. The platform will verify sustainability claims and fair labor practices across industries.",
        "Implement a computer vision system for automated license plate recognition that can identify vehicles in various lighting and weather conditions. The system will assist in traffic management, parking enforcement, and law enforcement investigations while addressing privacy concerns.",
        "Develop a machine learning model for predicting epidemic outbreaks by analyzing social media trends, environmental data, and historical disease patterns. The model will provide early warnings to health organizations for rapid response and containment strategies.",
        "Create an AI-powered system for automated content moderation on social media platforms that can detect and flag inappropriate content, hate speech, and misinformation in real-time. The system will adapt to evolving online language and context while balancing free speech concerns.",
        "Design a blockchain-based platform for decentralized insurance claims processing that automates claim verification, reduces fraud, and speeds up payouts. The platform will use smart contracts and IoT data to handle various insurance types efficiently.",
        "Build a natural language processing system for automated customer feedback analysis that can process large volumes of reviews, support tickets, and survey responses to extract actionable insights for businesses across multiple languages and industries.",
        "Implement a machine learning model for predicting equipment failure in manufacturing plants by analyzing sensor data, maintenance records, and production schedules. The model will help optimize maintenance strategies and minimize costly downtime.",
        "Develop an AI system for automated drone navigation and obstacle avoidance in complex urban environments. The system will enable safe and efficient drone operations for delivery services, search and rescue missions, and aerial surveying.",
        "Create a virtual reality platform for immersive scientific visualization that allows researchers to interact with complex data sets in 3D space. The platform will support collaborative analysis and provide intuitive tools for exploring molecular structures, astronomical data, and more.",
        "Design a blockchain-based system for secure and transparent land registry that prevents fraud, reduces disputes, and streamlines property transactions. The system will integrate with existing government databases and provide a tamper-proof record of ownership.",
        "Build a computer vision system for automated crop yield estimation using satellite imagery and drone footage. The system will help farmers and agricultural organizations forecast production, optimize resource allocation, and improve food security planning.",
        "Implement a machine learning model for predicting consumer behavior trends by analyzing social media activity, search patterns, and economic indicators. The model will assist businesses in product development, marketing strategies, and inventory management.",
        "Develop an AI-powered system for automated music mastering and production that can analyze and enhance audio tracks, balancing frequencies, and applying appropriate effects to achieve professional-quality sound across various genres.",
        "Create a blockchain-based platform for decentralized prediction markets that allows users to bet on future events in a transparent and manipulation-resistant manner. The platform will aggregate collective intelligence for forecasting in various domains.",
        "Design a natural language processing system for automated resume parsing and job matching that can extract relevant skills, experience, and qualifications from unstructured text. The system will improve the efficiency of recruitment processes and candidate matching.",
        "Build an augmented reality system for interactive educational experiences that overlays digital information and 3D models on textbooks and learning materials. The system will enhance engagement and comprehension across various subjects and age groups.",
        "Implement a machine learning model for predicting air quality in urban areas using data from IoT sensors, traffic patterns, and weather conditions. The model will provide real-time pollution forecasts and support urban planning for healthier cities.",
        "Develop a quantum computing algorithm for cryptography and secure communication that can create and break complex encryption schemes. The algorithm will advance the field of post-quantum cryptography and enhance data security in the age of quantum computers.",
        "Create a virtual reality platform for immersive psychological therapy sessions that provides safe environments for exposure therapy, stress reduction, and cognitive behavioral interventions. The platform will include progress tracking and therapist-guided experiences.",
        "Design an AI system for automated satellite image analysis and interpretation that can detect changes in land use, monitor deforestation, and assess damage from natural disasters. The system will support environmental conservation efforts and urban planning.",
        "Build a blockchain-based platform for decentralized identity verification that allows users to control and share their personal information securely. The platform will support self-sovereign identity principles and streamline KYC processes across services.",
        "Implement a computer vision system for automated sign language interpretation that can translate sign language into text and speech in real-time. The system will improve communication accessibility for the deaf and hard-of-hearing community.",
        "Develop a machine learning model for predicting renewable energy integration challenges in power grids. The model will analyze energy production patterns, consumption data, and grid infrastructure to optimize the balance between various energy sources.",
        "Create an AI-powered system for personalized education that adapts learning materials, pacing, and assessment methods to individual student needs. The system will use cognitive science principles to optimize knowledge retention and skill development.",
        "Design a blockchain-based platform for intellectual property rights management that streamlines patent filing, tracks usage rights, and facilitates fair licensing agreements. The platform will help creators protect and monetize their innovations efficiently.",
        "Build a natural language processing system for automated medical diagnosis that can analyze patient symptoms, medical history, and latest research to suggest potential diagnoses and treatment plans. The system will assist healthcare professionals in decision-making.",
        "Implement a machine learning model for predicting and mitigating the impacts of climate change on agriculture. The model will analyze climate data, crop resilience, and socio-economic factors to recommend adaptive farming strategies and policy interventions."
        ];

        Random random = new();
        int projectTitlesIndex = random.Next(projectTitles.Count - 1);
        int projectDescriptionsIndex = random.Next(projectDescriptions.Count - 1);

        var descriptionFaker = new Faker<Description>()
            .RuleFor(d => d.Text, f => projectDescriptions[projectDescriptionsIndex])
            .RuleFor(d => d.Tags, f => fakedTags);

        var projectFaker = new Faker<Project>()
            .RuleFor(p => p.Title, f => projectTitles[projectTitlesIndex])
            .RuleFor(p => p.Author, f => fakedUser)
            .RuleFor(p => p.AuthorId, (f, p) => authorId)
            .RuleFor(p => p.Description, f => descriptionFaker.Generate())
            .RuleFor(p => p.Progress, f => new Progress());

        projectTitles.RemoveAt(projectTitlesIndex);
        projectDescriptions.RemoveAt(projectDescriptionsIndex);

        return projectFaker.Generate();
    }
}



