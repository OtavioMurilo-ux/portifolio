// ============================================
// Script Principal - DSTEK Soluções Industriais
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();
    initProdutos();
    initFormValidation();
});

// ============================================
// Menu Mobile
// ============================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    }
}

// ============================================
// Efeitos de Scroll
// ============================================

function initScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = '#1a1a1a';
        }
    });

    // Animação de elementos ao.scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.produto-card, .parceiro-card, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
}

// ============================================
// Smooth Scroll
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Sistema de Produtos com Modal
// ============================================

const produtosData = {
    produto1: {
        titulo: 'CLP/PLC - Controladores Lógicos Programáveis',
        imagem: 'fas fa-microchip',
        descricao: 'Controladores Lógicos Programáveis de alta performance para automação industrial.',
        caracteristicas: [
            'Alta velocidade de processamento',
            'Múltiplas interfaces de comunicação',
            'Programação ladder e estruturada',
            'Suporte a módulos de expansão',
            'Certificação industrial'
        ],
        aplicacoes: [
            'Linhas de produção',
            'Máquinas industriais',
            'Sistemas de controle',
            'Automação predial'
        ],
        marcas: 'Siemens, Allen Bradley, Schneider, Mitsubishi, Omron'
    },
    produto2: {
        titulo: 'Robôs Industriais',
        imagem: 'fas fa-robot',
        descricao: 'Robôs industriais para solda, montagem, manipulação e pintura.',
        caracteristicas: [
            'Alta precisão e repetibilidade',
            'Múltiplos eixos de movimento',
            'Programação teach-pendant',
            'Integração com CLP e sistemas SCADA',
            'Certificação de segurança'
        ],
        aplicacoes: [
            'Soldagem a arco',
            'Soldagem a ponto',
            'Montagem de peças',
            'Manipulação de materiais',
            'Pintura industrial'
        ],
        marcas: 'Fanuc, ABB, Kuka, Yaskawa, Universal Robots'
    },
    produto3: {
        titulo: 'Motores e Inversores de Frequência',
        imagem: 'fas fa-tachometer-alt',
        descricao: 'Motores de alta eficiência e inversores de frequência para controle de velocidade.',
        caracteristicas: [
            'Alta eficiência energética',
            'Controle vetorial',
            'Partida suave',
            'Proteção contra sobrecarga',
            'Comunicação industrial'
        ],
        aplicacoes: [
            'Bombas e ventiladores',
            'Transportadores',
            'Compressores',
            'Bombas centrífugas'
        ],
        marcas: 'WEG, Siemens, Schneider, ABB, Danfoss'
    },
    produto4: {
        titulo: 'IHM - Interface Homem Máquina',
        imagem: 'fas fa-server',
        descricao: 'Painéis de operação para controle e monitoramento de processos industriais.',
        caracteristicas: [
            'Telas touch screen',
            'Múltiplos tamanhos',
            'Software de programação',
            'Alarme e recetas',
            'Conectividade ampla'
        ],
        aplicacoes: [
            'Painéis de operação',
            'Monitoramento de processos',
            'Visualização de dados',
            'Controle de máquinas'
        ],
        marcas: 'Siemens, Schneider, Mitsubishi, Omron, Proface'
    },
    produto5: {
        titulo: 'Redes Industriais',
        imagem: 'fas fa-network-wired',
        descricao: 'Equipamentos para comunicação industrial e fieldbus.',
        caracteristicas: [
            'Protocolos industriais',
            'Switches gerenciáveis',
            'Convertidores de protocolo',
            'Fibra óptica',
            'Redundância'
        ],
        aplicacoes: [
            'Ethernet Industrial',
            'PROFIBUS/PROFINET',
            'DeviceNet e ControlNet',
            'CANopen'
        ],
        marcas: 'Siemens, Schneider, Phoenix Contact, Weidmüller'
    },
    produto6: {
        titulo: 'Sensores e Atuadores',
        imagem: 'fas fa-sensors',
        descricao: 'Sensores indutivos, capacitivos, fotoelétricos e atuadores para automação.',
        caracteristicas: [
            'Alta precisão de detecção',
            'Múltiplas tecnologias',
            'Saídas PNP/NPN',
            'Proteção IP67/IP69K',
            'Cabos e conectores'
        ],
        aplicacoes: [
            'Detecção de presença',
            'Contagem de peças',
            'Posicionamento',
            'Controle de nível'
        ],
        marcas: 'Sick, Omron, Banner, IFM, Turck'
    }
};

function initProdutos() {
    // Os modais são abertos via onclick nos botões
}

// ============================================
// Funções do Modal
// ============================================

function openModal(produtoId) {
    const modal = document.getElementById('modal-produto');
    const modalBody = document.getElementById('modal-body');
    const produto = produtosData[produtoId];
    
    if (!produto) {
        console.error('Produto não encontrado:', produtoId);
        return;
    }
    
    modalBody.innerHTML = `
        <div class="modal-produto-content">
            <div class="modal-header-custom">
                <i class="${produto.imagem}"></i>
                <h2>${produto.titulo}</h2>
            </div>
            
            <div class="modal-body-custom">
                <p class="produto-descricao">${produto.descricao}</p>
                
                <div class="produto-detalhes">
                    <h3><i class="fas fa-list-ul"></i> Características</h3>
                    <ul>
                        ${produto.caracteristicas.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="produto-detalhes">
                    <h3><i class="fas fa-cogs"></i> Aplicações</h3>
                    <ul>
                        ${produto.aplicacoes.map(item => `<li><i class="fas fa-angle-right"></i> ${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="produto-marcas">
                    <h3><i class="fas fa-handshake"></i> Marcas Disponíveis</h3>
                    <p>${produto.marcas}</p>
                </div>
                
                <div class="modal-cta">
                    <a href="#orcamento" class="btn btn-primary" onclick="closeModal(); document.getElementById('produto').value='${produtoId}';">
                        <i class="fas fa-calculator"></i> Solicitar Orçamento
                    </a>
                    <a href="#contato" class="btn btn-secondary" onclick="closeModal();">
                        <i class="fas fa-envelope"></i> Fale Conosco
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Adicionar estilos do modal
    const style = document.createElement('style');
    style.textContent = `
        .modal-produto-content {
            padding: 20px;
        }
        .modal-header-custom {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #ffc107;
        }
        .modal-header-custom i {
            font-size: 40px;
            color: #ffc107;
        }
        .modal-header-custom h2 {
            font-size: 24px;
            color: #333;
        }
        .produto-descricao {
            font-size: 16px;
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .produto-detalhes {
            margin-bottom: 20px;
        }
        .produto-detalhes h3 {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .produto-detalhes ul {
            list-style: none;
        }
        .produto-detalhes li {
            padding: 5px 0;
            color: #555;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .produto-detalhes li i {
            color: #ffc107;
        }
        .produto-marcas {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .produto-marcas h3 {
            font-size: 16px;
            margin-bottom: 8px;
            color: #333;
        }
        .produto-marcas p {
            color: #666;
            font-weight: 500;
        }
        .modal-cta {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
        }
    `;
    document.head.appendChild(style);
}

function closeModal() {
    const modal = document.getElementById('modal-produto');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal-produto');
    if (e.target === modal) {
        closeModal();
    }
});

// Fechar modal com Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// Validação de Formulários
// ============================================

function initFormValidation() {
    // Máscara de telefone
    const telefoneInputs = document.querySelectorAll('input[type="tel"]');
    telefoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }
            e.target.value = value;
        });
    });

    // Validação de email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function(e) {
            const email = e.target.value;
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !regex.test(email)) {
                e.target.style.borderColor = 'red';
                showAlert('Por favor, insira um e-mail válido!', 'error');
            } else {
                e.target.style.borderColor = '';
            }
        });
    });
}

// ============================================
// Envio de Formulário de Orçamento
// ============================================

function enviarOrcamento(e) {}
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const produto = document.getElementById('produto').value;
    const mensagem = document.getElementById('mensagem').value;
    const empresa = document.getElementById('empresa').value;
    
    // Validar campos obrigatórios
    if (!nome || !email || !telefone) {
        showAlert('Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
    }
    
    // Simular envio (aqui você integraria com seu backend ou serviço como Form

    