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

    // Controle do Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

    // Fechar menu ao clicar em um link
        const links = navLinks.querySelectorAll('.nav-link, .btn-primary');
        links.forEach(link => {
        link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Fechar menu ao rolar
        window.addEventListener('scroll', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Prevenir scroll quando menu está aberto
    document.addEventListener('scroll', function() {
        if (body.classList.contains('menu-open')) {
            window.scrollTo(0, 0);
        }
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
    
    if (carousel && prevButton && nextButton) {
        function getCardWidth() {
            const card = carousel.querySelector('.professional-card');
            if (card) {
                const style = window.getComputedStyle(card);
                const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                return card.offsetWidth + margin;
            }
            return 320;
        }
        function scrollCarousel(direction) {
            const cardWidth = getCardWidth();
            const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        prevButton.addEventListener('click', () => scrollCarousel('prev'));
        nextButton.addEventListener('click', () => scrollCarousel('next'));
        
        // Suporte para gestos de swipe em dispositivos móveis
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    scrollCarousel('prev');
                } else {
                    scrollCarousel('next');
                }
            }
        }
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

    // Função para formatar a data
    function formatarData(data) {
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Adiciona o evento de submit ao formulário
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const professional = document.getElementById('professional').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

        // Formata a data
        const dataObj = new Date(date);
        const formattedDate = formatarData(dataObj);

        // Monta a mensagem com emojis Unicode
        let message = `Olá! Gostaria de agendar um horário:\n\n`;
        message += `\u{1F464} Nome: ${name}\n`;
        message += `\u{1F4F1} Telefone: ${phone}\n`;
        message += `\u{1F486} Serviço: ${service}\n`;
        message += `\u{1F469} Profissional: ${professional}\n`;
        message += `\u{1F4C5} Data: ${formattedDate}\n`;
        message += `\u{1F551} Horário: ${time}\n`;

        // Codifica a mensagem para URL
        const encodedMessage = encodeURIComponent(message);

            // Número do WhatsApp
            const phoneNumber = "5521970255490";

        // Monta o link
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Abre o link em uma nova aba
        window.open(whatsappLink, '_blank');
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

    // Preencher serviço selecionado na página de agendamento
    if (window.location.pathname.includes('agendamento.html')) {
        // Obter parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        const service = urlParams.get('service');
        const price = urlParams.get('price');
        
        // Preencher o serviço selecionado
        if (service) {
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                const options = serviceSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].text.includes(service)) {
                        serviceSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }

        // Validação de data para o formulário de agendamento
        const dateInput = document.getElementById('date');
        if (dateInput) {
            // Definir data mínima como hoje
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
    }

    // Controle do menu fixo
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Menu fixo ao rolar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
    });
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

const mensagem = `*Nova Solicitação de Agendamento* \u{1F389}

*Dados do Cliente:*
\u{1F464} *Nome:* ${nome}
\u{1F4F1} *Telefone:* ${telefone}

*Detalhes do Agendamento:*
\u{1F4C5} *Data:* ${data}
\u{1F552} *Horário:* ${horario}
\u{1F486} *Serviço:* ${servico}
\u{1F468}\u{200D}\u{2695}\u{FE0F} *Profissional:* ${profissional}

*Observações:*
${observacoes || 'Nenhuma observação fornecida'}

*Status:* \u{23F3} *Aguardando confirmação*

_Esta é uma mensagem automática gerada pelo sistema de agendamento._`; 