document.addEventListener('DOMContentLoaded', function() {
    // Manipulação dos botões de agendamento
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const price = this.getAttribute('data-price');
            window.location.href = `agendamento.html?service=${encodeURIComponent(service)}&price=${encodeURIComponent(price)}`;
        });
    });

    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação do header ao rolar
    const headerElement = document.querySelector('header');
    let lastScrollPosition = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            headerElement.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScrollPosition && !headerElement.classList.contains('scroll-down')) {
            headerElement.classList.remove('scroll-up');
            headerElement.classList.add('scroll-down');
        } else if (currentScroll < lastScrollPosition && headerElement.classList.contains('scroll-down')) {
            headerElement.classList.remove('scroll-down');
            headerElement.classList.add('scroll-up');
        }
        lastScrollPosition = currentScroll;
    });

    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    // Manipulação do formulário de contato
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Obrigado pelo seu contato! Entraremos em contato em breve.');
            form.reset();
        });
    }

    // Manipulação do formulário de feedback
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const rating = e.target.querySelector('select').value;
            const stars = '⭐'.repeat(parseInt(rating));
            
            alert(`Obrigado pelo seu feedback! ${stars}\nSeu comentário será revisado e publicado em breve.`);
            
            feedbackForm.reset();
        });
    }

    // Carrossel de profissionais
    const carousel = document.querySelector('.professionals-carousel');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cards = document.querySelectorAll('.professional-card');
    
    if (carousel && prevButton && nextButton && cards.length > 0) {
        let currentIndex = 0;
        let isMobile = window.innerWidth <= 768;
        
        // Função para calcular a largura do card
        function getCardWidth() {
            return isMobile ? carousel.offsetWidth : cards[0].offsetWidth + 32; // No mobile usa largura total
        }
        
        // Função para atualizar a posição do carrossel
        function updateCarousel() {
            const cardWidth = getCardWidth();
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        
        // Função para verificar se os botões devem estar desabilitados
        function updateButtons() {
            prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevButton.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            
            const maxIndex = cards.length - (isMobile ? 1 : Math.floor(carousel.parentElement.offsetWidth / getCardWidth()));
            nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextButton.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }
        
        // Event listeners para os botões
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
                updateButtons();
            }
        });
        
        nextButton.addEventListener('click', function() {
            const maxIndex = cards.length - (isMobile ? 1 : Math.floor(carousel.parentElement.offsetWidth / getCardWidth()));
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
                updateButtons();
            }
        });

        // Adicionar suporte para gestos de swipe no mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentIndex < cards.length - 1) {
                    // Swipe para esquerda
                    nextButton.click();
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe para direita
                    prevButton.click();
                }
            }
        }
        
        // Atualizar o carrossel quando a janela for redimensionada
        window.addEventListener('resize', function() {
            isMobile = window.innerWidth <= 768;
            currentIndex = 0; // Reset para a primeira imagem ao redimensionar
            updateCarousel();
            updateButtons();
        });
        
        // Inicializar o carrossel
        updateCarousel();
        updateButtons();
    }

    // Efeito de parallax para a seção hero
    const hero = document.querySelector('.hero');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY;
        
        if (currentScrollY < hero.offsetHeight) {
            hero.style.backgroundPositionY = `${currentScrollY * 0.5}px`;
        }
        
        lastScrollY = currentScrollY;
    });

    // Modal de Agendamento
    const modal = document.getElementById('schedulingModal');
    const closeBtn = document.querySelector('.close');
    const schedulingForm = document.getElementById('schedulingForm');

    // Mapeamento de serviços e valores
    const servicePrices = {
        'Massagem Relaxante': 'R$ 150,00',
        'Massagem Tântrica': 'R$ 200,00',
        'Massagem Desportiva': 'R$ 180,00',
        'Massagem Modeladora': 'R$ 170,00',
        'Massagem com Pedras Quentes': 'R$ 190,00',
        'Massagem com Aromaterapia': 'R$ 160,00'
    };

    // Fechar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'none';
                modal.style.opacity = '0';
                modal.style.visibility = 'hidden';
            }
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
        }
    });

    // Formulário de Agendamento
    if (schedulingForm) {
        // Obter parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        const service = urlParams.get('service');
        const price = urlParams.get('price');

        // Preencher o serviço selecionado
        if (service) {
            const serviceSelect = document.getElementById('service');
            const options = serviceSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === service) {
                    serviceSelect.selectedIndex = i;
                    break;
                }
            }
        }

        // Configurar data mínima como hoje e validar dias da semana
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            const minDate = yyyy + '-' + mm + '-' + dd;
            dateInput.min = minDate;

            // Adicionar validação para dias da semana
            dateInput.addEventListener('change', function() {
                const selectedDate = new Date(this.value);
                const dayOfWeek = selectedDate.getDay();
                
                // 0 = Domingo, 6 = Sábado
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    alert('Por favor, selecione um dia útil (segunda a sexta-feira).');
                    this.value = '';
                }
            });
        }

        // Envio do formulário
        schedulingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Formatar a data para o padrão brasileiro
            const rawDate = document.getElementById('date').value;
            const [year, month, day] = rawDate.split('-');
            const formattedDate = `${day}/${month}/${year}`;

            // Pegar o preço do serviço selecionado
            const serviceSelect = document.getElementById('service');
            const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
            const servicePrice = selectedOption.getAttribute('data-price');

            const formData = {
                name: document.getElementById('name').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: selectedOption.value,
                price: `R$ ${servicePrice},00`,
                professional: document.getElementById('professional').value,
                date: formattedDate,
                time: document.getElementById('time').value,
                notes: document.getElementById('notes').value.trim()
            };

            // Construir mensagem para WhatsApp com emojis
            const message = 
                `✨ *NOVO AGENDAMENTO - VITAL SPA* ✨%0A%0A` +
                `👤 *Nome:* ${formData.name}%0A` +
                `📱 *Telefone:* ${formData.phone}%0A%0A` +
                `💆‍♀️ *Serviço:* ${formData.service}%0A` +
                `💰 *Valor:* ${formData.price}%0A` +
                `👩‍⚕️ *Profissional:* ${formData.professional}%0A%0A` +
                `📅 *Data:* ${formData.date}%0A` +
                `⏰ *Horário:* ${formData.time}h%0A%0A` +
                (formData.notes ? `📝 *Observações:*%0A${formData.notes}%0A%0A` : '') +
                `✨ *Agradecemos sua preferência!* ✨%0A` +
                `💌 Confirmaremos seu agendamento em breve.`;

            // Redirecionar para WhatsApp com o novo formato de URL
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=5521970255490&text=${message}&type=phone_number&app_absent=0`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Galeria de imagens do local
    const mainImg = document.querySelector('.main-img');
    const thumbnails = document.querySelectorAll('.thumb-img');
    
    if (mainImg && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Atualiza a imagem principal
                mainImg.src = this.src;
                
                // Remove a classe ativa de todas as miniaturas
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Adiciona a classe ativa na miniatura clicada
                this.classList.add('active');
                
                // Adiciona efeito de fade
                mainImg.style.opacity = '0';
                setTimeout(() => {
                    mainImg.style.opacity = '1';
                }, 100);
            });
        });
    }

    // Animação dos cartões de comentários
    const commentCards = document.querySelectorAll('.comment-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    commentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Efeito hover nos cartões de comentários
    commentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.borderColor = 'var(--gold)';
            card.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.borderColor = 'rgba(255, 215, 0, 0.1)';
            card.style.boxShadow = 'none';
        });
    });

    // Animação dos cards de serviços
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.5s ease';
        servicesObserver.observe(card);
    });

    // Animação dos cards de profissionais
    const professionalCards = document.querySelectorAll('.professional-card');
    const professionalsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });

    professionalCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        professionalsObserver.observe(card);
    });

    // Manipulação do formulário de agendamento
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const serviceSelect = document.getElementById('service');
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const price = serviceSelect.options[serviceSelect.selectedIndex].getAttribute('data-price');
            const professionalSelect = document.getElementById('professional');
            const professional = professionalSelect.options[professionalSelect.selectedIndex].value;
            const date = document.getElementById('date').value;
            const timeSelect = document.getElementById('time');
            const time = timeSelect.options[timeSelect.selectedIndex].value;
            const notes = document.getElementById('notes').value;

            // Formatar a data para o padrão brasileiro
            const [year, month, day] = date.split('-');
            const formattedDate = `${day}/${month}/${year}`;

            // Construir a mensagem
            let message = `🌺 *Novo Agendamento - Vital Spa* 🌺\n\n`;
            message += `👤 *Nome:* ${name}\n`;
            message += `📱 *Telefone:* ${phone}\n`;
            message += `💆‍♀️ *Serviço:* ${service}\n`;
            message += `💰 *Valor:* R$ ${parseFloat(price).toFixed(2).replace('.', ',')}\n`;
            message += `👩‍⚕️ *Profissional:* ${professional}\n`;
            message += `📅 *Data:* ${formattedDate}\n`;
            message += `⏰ *Horário:* ${time}\n`;
            
            if (notes.trim()) {
                message += `📝 *Observações:* ${notes}\n`;
            }

            // Codificar a mensagem para URL
            const encodedMessage = encodeURIComponent(message);

            // Redirecionar para o WhatsApp com a mensagem
            window.location.href = `https://api.whatsapp.com/send/?phone=5521970255490&text=${encodedMessage}&type=phone_number&app_absent=0`;
        });
    }
});

// Função para mudar a imagem principal na página de perfil
function changeImage(src) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    }
}

// Animação dos números das estatísticas
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.textContent.includes('+') ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observador de interseção para animar as estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const endValue = parseInt(stat.textContent);
                animateValue(stat, 0, endValue, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
} 