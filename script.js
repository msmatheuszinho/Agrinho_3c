document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // ESTADO E LOGICA DE ACESSIBILIDADE (FONTE E CONTRASTE)
    // ==========================================================================
    let currentFontSize = 16;
    const bodyEl = document.body;
    
    const updateFontSize = (size) => {
        if (size >= 12 && size <= 24) {
            currentFontSize = size;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    };

    document.getElementById('btn-font-increase').addEventListener('click', () => {
        updateFontSize(currentFontSize + 1);
    });

    document.getElementById('btn-font-decrease').addEventListener('click', () => {
        updateFontSize(currentFontSize - 1);
    });

    document.getElementById('btn-contrast').addEventListener('click', () => {
        bodyEl.classList.toggle('high-contrast');
    });

    // ==========================================================================
    // RENDERIZAÇÃO E LOGICA DO CARROSSEL VIA ARRAY DE OBJETOS
    // ==========================================================================
    const testimonialsData = [
        {
            text: "O CultivoDireto mudou nossa vida. Antes eu dependia de atravessadores que pagavam mixaria pelo nosso tomate. Hoje vendo tudo direto para duas redes de hortifrúti locais.",
            author: "Seu Altamiro e Família",
            location: "Produtores de Tomate Orgânico - Nova Friburgo/RJ"
        },
        {
            text: "A plataforma é tão simples que até eu, que não mexia muito com internet, consegui cadastrar minha produção de morangos. Recebo os pedidos direto no celular.",
            author: "Dona Maria de Fátima",
            location: "Cultivo de Frutas Vermelhas - Atibaia/SP"
        },
        {
            text: "Vendemos toda a nossa colheita de folhagens em menos de uma semana. O fluxo de caixa limpo e direto pelo Pix facilitou muito a compra de novos insumos.",
            author: "Ricardo Santos",
            location: "Cooperativa Familiar - Juazeiro/BA"
        }
    ];

    const carouselTrack = document.getElementById('carousel-track');
    
    testimonialsData.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        slide.innerHTML = `
            <div class="testimonial-card">
                <p class="testimonial-text">"${item.text}"</p>
                <span class="testimonial-author">${item.author}</span>
                <span class="testimonial-location">${item.location}</span>
            </div>
        `;
        carouselTrack.appendChild(slide);
    });

    let currentSlide = 0;
    const totalSlides = testimonialsData.length;

    const moveCarousel = () => {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    document.getElementById('carousel-next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        moveCarousel();
    });

    document.getElementById('carousel-prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        moveCarousel();
    });

    // ==========================================================================
    // RENDERIZAÇÃO E LOGICA DO ACORDEÃO (FAQ) VIA ARRAY DE OBJETOS
    // ==========================================================================
    const faqData = [
        {
            question: "Como o CultivoDireto consegue ser gratuito para o produtor?",
            answer: "Nosso modelo de negócios é focado em parcerias estruturais e soluções corporativas para os grandes compradores urbanos. Para a agricultura familiar e o pequeno produtor, a plataforma é e sempre será 100% gratuita."
        },
        {
            question: "Preciso ter CNPJ ou bloco de produtor rural?",
            answer: "Não é obrigatório para começar. Você pode se cadastrar utilizando apenas seu CPF para realizar as primeiras vendas diretas. Caso o comprador exija nota, orientamos como emitir a Nota Fiscal do Produtor de forma simples."
        },
        {
            question: "Como funciona a entrega dos produtos vendidos?",
            answer: "A combinação da entrega é flexível. No momento do anúncio, você define se o comprador retira na sua propriedade ou se você entrega em pontos específicos da cidade nas datas combinadas."
        },
        {
            question: "E se a internet na minha propriedade for instável?",
            answer: "Nossa interface foi desenvolvida para carregar com o mínimo de dados possível. Você pode atualizar seu estoque e visualizar mensagens mesmo com conexões instáveis 3G de áreas rurais."
        }
    ];

    const accordionContainer = document.getElementById('faq-accordion');

    faqData.forEach((item, index) => {
        const accItem = document.createElement('div');
        accItem.classList.add('accordion-item');
        
        accItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" data-index="${index}">
                <span>${item.question}</span>
                <i class="fas fa-chevron-down accordion-icon"></i>
            </button>
            <div class="accordion-content">
                <p>${item.answer}</p>
            </div>
        `;
        
        accordionContainer.appendChild(accItem);
    });

    // Lógica de Ativação do Acordeão
    const headers = accordionContainer.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Fecha todos os outros itens antes de abrir o atual (efeito sanfona single)
            accordionContainer.querySelectorAll('.accordion-item').forEach(el => {
                if(el !== item) {
                    el.classList.remove('active');
                    el.querySelector('.accordion-content').style.maxHeight = null;
                    el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                }
            });

            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                this.setAttribute('aria-expanded', 'true');
            } else {
                content.style.maxHeight = null;
                this.setAttribute('aria-expanded', 'false');
            }
        });
    });
});