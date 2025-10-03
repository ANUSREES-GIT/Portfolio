// main.js — small utilities for interactions & animations
document.addEventListener('DOMContentLoaded', () => {
    // set year in footer
    const years = new Date().getFullYear();
    ['year','year2','year3','year4','year5'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.textContent = years;
    });
  
    // nav toggle for small screens
    const navToggle = document.querySelector('.nav-toggle');
    if(navToggle){
      navToggle.addEventListener('click', e=>{
        const nav = document.querySelector('.nav');
        if(nav) nav.style.display = (nav.style.display === 'block') ? '' : 'block';
      });
    }
  
    // reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add('show');
      });
    }, {threshold: 0.12});
    reveals.forEach(r=>io.observe(r));
  
    // tilt effect (simple)
    document.querySelectorAll('[data-tilt]').forEach(el=>{
      el.addEventListener('mousemove', (e)=>{
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) - rect.width/2;
        const y = (e.clientY - rect.top) - rect.height/2;
        el.style.transform = `perspective(600px) rotateX(${(-y/20).toFixed(2)}deg) rotateY(${(x/20).toFixed(2)}deg) translateZ(6px)`;
      });
      el.addEventListener('mouseleave', ()=> el.style.transform = '');
    });
  
    // Project modal
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalLink = document.getElementById('modal-link');
  
    document.querySelectorAll('.open-project').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        const card = e.target.closest('.project-card');
        const data = JSON.parse(card.dataset.project);
        if(modal){
          modalImg.src = data.img || 'assets/projects/placeholder.jpg';
          modalImg.alt = data.title;
          modalTitle.textContent = data.title;
          modalDesc.textContent = data.desc;
          modalLink.href = '#';
          modal.classList.add('show');
          modal.setAttribute('aria-hidden','false');
        }
      });
    });
  
    document.querySelectorAll('.modal-close, .modal').forEach(el=>{
      el.addEventListener('click', (e)=>{
        if(e.target === el || el.classList.contains('modal-close')){
          modal.classList.remove('show');
          modal.setAttribute('aria-hidden','true');
        }
      });
    });
  
    // contact form faux submission + validation
    const form = document.getElementById('contactForm');
    if(form){
      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const msg = form.message.value.trim();
        const formMsg = document.getElementById('formMsg');
  
        if(!name || !email || !msg){
          formMsg.textContent = 'Please fill all fields.';
          formMsg.style.color = '#ffb4b4';
          return;
        }
        // basic email test
        if(!/^\S+@\S+\.\S+$/.test(email)){
          formMsg.textContent = 'Please enter a valid email.';
          formMsg.style.color = '#ffb4b4';
          return;
        }
  
        // In production, hook this to an API (Netlify Functions, Formspree, or your backend).
        formMsg.textContent = 'Message sent (demo). I will reply to your email soon.';
        formMsg.style.color = '#c7ffd8';
        form.reset();
      });
    }
  
    // open links that are anchor placeholders - no-op to avoid page jump
    document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));
  });

  //resume
  const sections = document.querySelectorAll('.resume-section');
  const navLinks = document.querySelectorAll('.resume-nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Highlight sidebar links dynamically
const links = document.querySelectorAll('.sidebar-nav a, .resume-nav a');
links.forEach(link => {
  if(link.href === window.location.href) link.classList.add('active');
});
