import { useState, useEffect } from 'react'
import './App.css'

// Slide Data
const slidesData = [
  {
    id: 1,
    type: 'title',
    headline: 'Deccan Eye',
    subheadline: 'The Future of Intelligent Surveillance',
    footer: 'Advanced AI Computer Vision & Smart Automation Solutions.\nPowered by VS Computers.',
    bgImage: import.meta.env.BASE_URL + 'logo.png' // Using logo as BG placeholder/fallback if needed, but title slide has custom CSS
  },
  {
    id: 2,
    type: 'founders',
    title: 'Meet the Founders',
    founders: [
      { name: 'Tokapuram Uttam Kumar', image: import.meta.env.BASE_URL + 'uttam.png', education: 'NIT Graduate (Computer Science)', role: 'Chief Architect & Visionary', experience: 'Experience: Data Scientist at Reliance Life Sciences' },
      { name: 'Tokapuram Sai Bharath', image: import.meta.env.BASE_URL + 'saibharath.png', education: 'M.Tech VLSI Design (CMR)', role: 'Hardware Lead (VLSI/Systems)', experience: 'Experience: Lecturer, Electrical Technician Department' },
      { name: 'Shiva Sai Neeli', image: import.meta.env.BASE_URL + 'shiva sai.png', education: 'NIT Graduate (Electrical Engineering)', role: 'Software Dev (AI/Backend)', experience: 'Experience: Software Developer at Oracle' }
    ]
  },
  {
    id: 3,
    type: 'split',
    title: 'Why Standard CCTV is Not Enough',
    image: import.meta.env.BASE_URL + 'normal cctv.png',
    points: [
      { text: 'Passive Recording: Traditional cameras only record; they cannot "see" threats or take action automatically.', level: 0 },
      { text: 'Manual Monitoring: Requires dedicated security personnel watching screens 24/7, leading to fatigue and missed incidents.', level: 0 },
      { text: 'No Real-Time Alerts: You discover crimes only after they happen, making prevention impossible.', level: 0 }
    ]
  },
  {
    id: 4,
    type: 'split',
    title: 'Smart Optimization: How We Save Bandwidth',
    image: import.meta.env.BASE_URL + '4th slide.jpg',
    points: [
      { text: '3-Stream Technology: Leveraging multi-stream capability of modern IP Cameras for optimal performance.', level: 0 },
      { text: 'Stream 1 (High Quality): Crystal clear 4K evidence recording for court-admissible footage.', level: 1 },
      { text: 'Stream 3 (AI Processing): Efficient AI analysis at 720x567 resolution for real-time detection.', level: 1 },
      { text: 'Result: Perfect balance of accuracy and speed, ensuring zero system lag even with multiple cameras.', level: 0 }
    ]
  },
  {
    id: 5,
    type: 'split',
    title: 'Automated Traffic & Safety Detection',
    images: [import.meta.env.BASE_URL + 'triple-riding.png', import.meta.env.BASE_URL + 'without helmet.png'],
    points: [
      { text: 'Helmet Detection: Instantly identifies riders without helmets.', level: 0 },
      { text: 'Triple Riding: Detects more than two passengers.', level: 0 },
      { text: 'Number Plate Catching: Captures plates upon violation detection.', level: 0 }
    ]
  },
  {
    id: 6,
    type: 'workflow',
    title: 'Under the Hood: The D-Fine Workflow',
    steps: [
      { step: 'Step 1', text: 'Process every 5th Frame' },
      { step: 'Step 2', text: 'D-Fine Computer Vision Model' },
      { step: 'Step 3', text: 'Best Picture Selection' },
      { step: 'Step 4', text: 'YOLO & PaddleOCR' }
    ]
  },
  {
    id: 7,
    type: 'split',
    title: 'Seamless Access Control',
    image: import.meta.env.BASE_URL + 'automatic_car_opening.png',
    points: [
      { text: 'Auto-Gate Opening: Gate opens automatically when your registered vehicle approaches - no remote needed.', level: 0 },
      { text: 'Smart Home Integration: Control lights, fans, and appliances directly from your mobile phone.', level: 0 },
      { text: 'License Plate Recognition: Your car\'s number plate becomes your secure digital key to your property.', level: 0 }
    ]
  },
  {
    id: 8,
    type: 'split',
    title: 'Face Recognition & Semantic Search',
    image: import.meta.env.BASE_URL + 'face rec.jpeg',
    points: [
      { text: 'Inbuilt Face Recognition: Identifies personnel or blacklisted individuals.', level: 0 },
      { text: 'Semantic Search: Search video with natural language.', level: 0 },
      { text: 'Example: Type "Person with Red Cap" → Retrieves matching clips.', level: 1 },
      { text: 'Benefit: Solves cases in minutes.', level: 0 }
    ]
  },
  {
    id: 9,
    type: 'split',
    title: 'Bank-Grade Data Security',
    image: import.meta.env.BASE_URL + 'secured.png',
    points: [
      { text: 'Built on Ubuntu: Enterprise-grade Linux OS providing maximum stability and security for 24/7 operation.', level: 0 },
      { text: 'Tailscale VPN: Military-grade encrypted remote access without risky port forwarding or complex firewall rules.', level: 0 },
      { text: 'Zero Trust Security: Private mesh network architecture that is immune to external hacking attempts.', level: 0 }
    ]
  },
  {
    id: 10,
    type: 'split',
    title: 'Connecting the Unconnected',
    image: import.meta.env.BASE_URL + 'P2p.png',
    containImage: true,
    points: [
      { text: 'Wireless Command Control: Mandal-level monitoring centers connected via advanced P2P technology.', level: 0 },
      { text: 'Cable-Free Installation: Video streams transmitted wirelessly up to 5km range, no trenching required.', level: 0 },
      { text: 'Cost Effective: Eliminates expensive cable laying and reduces installation time by 70%.', level: 0 }
    ]
  },
  {
    id: 11,
    type: 'split',
    title: 'Powering Remote Locations',
    image: import.meta.env.BASE_URL + 'solar cam.jpg',
    containImage: true,
    points: [
      { text: 'Solar + 4G Cameras: Self-powered surveillance solution for locations without electricity grid access.', level: 0 },
      { text: 'Fully Autonomous: Runs on solar power during day, battery backup at night, transmits via 4G/LTE network.', level: 0 },
      { text: 'Complete Coverage: Bring professional security to farms, forests, and the most remote corners of your territory.', level: 0 }
    ]
  },
  {
    id: 12,
    type: 'contact',
    title: 'Secure Your World with Deccan Eye',
    website: 'www.deccaneye.com',
    phone: '+91 70363 06446 / +91 93916 09598',
    office: 'VS Computers, Kulkacherla',
    closing: 'Thank you for your time. Together, let\'s build a safer future.'
  }
]

// Slide Components
function TitleSlide({ data }) {
  return (
    <div className="slide title-slide">
      <div className="accent-circle"></div>
      <div className="content">
        <img src={import.meta.env.BASE_URL + "logo.png"} alt="Deccan Eye Logo" className="logo" />
        <h1>{data.headline}</h1>
        <h2>{data.subheadline}</h2>
        <p>{data.footer}</p>
      </div>
    </div>
  )
}

function FoundersSlide({ data }) {
  return (
    <div className="slide">
      <div className="slide-header">
        <h2>{data.title}</h2>
        <img src={import.meta.env.BASE_URL + "logo.png"} alt="Logo" className="logo" />
      </div>
      <div className="slide-content">
        <div className="founders-grid">
          {data.founders.map((founder, idx) => (
            <div key={idx} className="founder-card glass-panel">
              <div className="avatar">
                <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <h3>{founder.name}</h3>
              <p className="education">{founder.education}</p>
              <p className="experience">{founder.experience}</p>
              <p className="role">{founder.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="slide-footer"></div>
    </div>
  )
}

function SplitSlide({ data }) {
  const hasMultipleImages = data.images && data.images.length > 1;

  return (
    <div className="slide split-slide-container">
      <div className="slide-header">
        <h2>{data.title}</h2>
        <img src={import.meta.env.BASE_URL + "logo.png"} alt="Logo" className="logo" />
      </div>
      <div className="split-content">
        <div className="text-panel glass-panel">
          <ul className="bullet-list">
            {data.points.map((point, idx) => (
              <li key={idx} className={point.level === 1 ? 'sub-item' : ''}>
                {point.text}
              </li>
            ))}
          </ul>
        </div>
        <div className={`image-panel ${hasMultipleImages ? 'multi-image' : ''} ${data.containImage ? 'contain-image' : ''}`}>
          {hasMultipleImages ? (
            data.images.map((img, idx) => (
              <img key={idx} src={img} alt={`${data.title} ${idx + 1}`} />
            ))
          ) : (
            <img src={data.image || (data.images && data.images[0])} alt={data.title} onError={(e) => { e.target.style.display = 'none' }} />
          )}
        </div>
      </div>
      <div className="slide-footer"></div>
    </div>
  )
}

function WorkflowSlide({ data }) {
  return (
    <div className="slide">
      <div className="slide-header">
        <h2>{data.title}</h2>
        <img src={import.meta.env.BASE_URL + "logo.png"} alt="Logo" className="logo" />
      </div>
      <div className="slide-content">
        <div className="workflow-steps">
          {data.steps.map((step, idx) => (
            <div key={idx} className="workflow-wrapper">
              <div className="workflow-step glass-panel">
                <div className="step-number">{step.step}</div>
                <div className="step-text">{step.text}</div>
              </div>
              {idx < data.steps.length - 1 && <span className="workflow-arrow">→</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="slide-footer"></div>
    </div>
  )
}

function ContactSlide({ data }) {
  return (
    <div className="slide">
      <div className="slide-header">
        <h2>{data.title}</h2>
        <img src={import.meta.env.BASE_URL + "logo.png"} alt="Logo" className="logo" />
      </div>
      <div className="slide-content">
        <div className="contact-card glass-panel">
          <h3>Contact Us</h3>
          <p>🌐 {data.website}</p>
          <p>📞 {data.phone}</p>
          <p>📍 {data.office}</p>
          <p className="closing">{data.closing}</p>
        </div>
      </div>
      <div className="slide-footer"></div>
    </div>
  )
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const goNext = () => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const goPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goNext()
      } else if (e.key === 'ArrowLeft') {
        goPrev()
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [currentSlide])

  // Touch swipe support for mobile
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      const swipeThreshold = 50
      const diff = touchStartX - touchEndX

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - go to next slide
          if (currentSlide < slidesData.length - 1) {
            setCurrentSlide(currentSlide + 1)
          }
        } else {
          // Swiped right - go to previous slide
          if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
          }
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSlide])

  const renderSlide = (slide, index) => {
    // Logic moved inside map for cleaner transitions in React
    return null;
  }

  return (
    <>
      <div className="presentation">
        {slidesData.map((slide, index) => {
          let slideClass = ''
          if (index === currentSlide) slideClass = 'active'
          else if (index < currentSlide) slideClass = 'prev'
          else if (index > currentSlide) slideClass = 'next'

          let ContentComponent;
          switch (slide.type) {
            case 'title': ContentComponent = TitleSlide; break;
            case 'founders': ContentComponent = FoundersSlide; break;
            case 'split': ContentComponent = SplitSlide; break;
            case 'workflow': ContentComponent = WorkflowSlide; break;
            case 'contact': ContentComponent = ContactSlide; break;
            default: ContentComponent = TitleSlide;
          }

          return (
            <div key={slide.id} className={`slide-wrapper ${slideClass}`}>
              <ContentComponent data={slide} />
            </div>
          )
        })}
      </div>

      <div className="nav-controls glass-panel">
        <button onClick={goPrev} disabled={currentSlide === 0}>←</button>
        <span className="slide-counter">{currentSlide + 1} / {slidesData.length}</span>
        <button onClick={goNext} disabled={currentSlide === slidesData.length - 1}>→</button>
        <button onClick={toggleFullscreen} className="fullscreen-btn" title="Fullscreen (F)">
          {isFullscreen ? '⛶' : '⛶'}
        </button>
      </div>
    </>
  )
}

export default App
