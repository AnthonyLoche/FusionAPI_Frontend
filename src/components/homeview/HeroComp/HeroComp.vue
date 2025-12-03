<template>
  <div class="hero-carousel">
    <v-carousel height="550" cycle hide-delimiters hide-delimiter-background show-arrows="hover" interval="6000"
      class="carousel-container">
      <v-carousel-item v-for="(slide) in slides" :key="slide.id" :src="slide.backgroundImage" cover>
        <div class="slide-overlay" :style="{ background: getOverlayGradient(slide.overlayColor) }">
          <div class="slide-content">
            <div class="content-wrapper">
              <span class="badge" :style="{ borderColor: slide.tagColor, color: slide.tagColor }">
                {{ slide.badge }}
              </span>
              <h1 class="title" v-html="slide.title"></h1>
              <p class="subtitle">{{ slide.subtitle }}</p>

              <div class="features-list">
                <div v-for="(feature, idx) in slide.features" :key="idx" class="feature-item">
                  <v-icon size="small" class="mr-2">{{ feature.icon }}</v-icon>
                  <span>{{ feature.text }}</span>
                </div>
              </div>

              <div class="buttons-container">
                <button class="cta-button primary" :style="{ background: slide.buttonColor }"
                  @click="navigateTo(slide.ctaLink)">
                  <span>{{ slide.ctaText }}</span>
                  <v-icon>mdi-arrow-right</v-icon>
                </button>

                <button v-if="slide.secondaryCta" class="cta-button secondary"
                  @click="navigateTo(slide.secondaryCta.link)">
                  <span>{{ slide.secondaryCta.text }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>

const slides = [
  {
    id: 1,
    badge: 'Assistência Técnica',
    title: 'Assistência Técnica <span style="color: #3498db">Especializada</span>',
    subtitle: 'Conserto rápido e garantido de notebooks, PCs, impressoras e periféricos.',
    ctaText: 'Solicitar Orçamento',
    backgroundImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    overlayColor: 'rgba(44, 62, 80, 0.6)',
    tagColor: '#3498db',
    buttonColor: '#e74c3c',
    ctaLink: '/assistencia-tecnica',
    features: [
      { icon: 'mdi-tools', text: 'Técnicos Certificados' },
      { icon: 'mdi-clock-fast', text: 'Conserto em 24h' },
      { icon: 'mdi-shield-check', text: 'Garantia de 90 dias' }
    ]
  },
  {
    id: 2,
    badge: 'Notebooks',
    title: 'Notebooks',
    subtitle: 'Alta performance para jogos e trabalho. RTX, i9, 32GB RAM e muito mais.',
    ctaText: 'Ver Modelos',
    backgroundImage: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    overlayColor: 'rgba(52, 152, 219, 0.6)',
    tagColor: '#e74c3c',
    buttonColor: '#2c3e50',
    ctaLink: '/categoria/notebooks-gamer',
    secondaryCta: {
      text: 'Montar PC Gamer',
      link: '/montagem-pc-gamer'
    },
    features: [
      { icon: 'mdi-gamepad-variant', text: 'RTX 40 Series' },
      { icon: 'mdi-cpu-64-bit', text: 'Processadores Intel/AMD' },
      { icon: 'mdi-memory', text: 'Até 64GB RAM' }
    ]
  },
  {
    id: 3,
    badge: 'Montagem de PCs',
    title: 'PCs <span style="color: #2ecc71">Customizados</span>',
    subtitle: 'Monte seu PC dos sonhos com peças selecionadas e assistência especializada.',
    ctaText: 'Montar Agora',
    backgroundImage: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    overlayColor: 'rgba(46, 204, 113, 0.6)',
    tagColor: '#2ecc71',
    buttonColor: '#9b59b6',
    ctaLink: '/montagem-pc',
    features: [
      { icon: 'mdi-cog', text: 'Configuração Personalizada' },
      { icon: 'mdi-test-tube', text: 'Teste de Stress' },
      { icon: 'mdi-wrench', text: 'Montagem Profissional' }
    ]
  },
  {
    id: 4,
    badge: 'Impressoras & Scanners',
    title: 'Impressoras <span style="color: #9b59b6">Profissionais</span>',
    subtitle: 'Multifuncionais, jato de tinta, laser e 3D para escritório e indústria.',
    ctaText: 'Comparar Modelos',
    backgroundImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    overlayColor: 'rgba(155, 89, 182, 0.6)',
    tagColor: '#9b59b6',
    buttonColor: '#3498db',
    ctaLink: '/categoria/impressoras',
    secondaryCta: {
      text: 'Suporte Técnico',
      link: '/suporte-impressoras'
    },
    features: [
      { icon: 'mdi-printer', text: 'Multifuncionais' },
      { icon: 'mdi-printer-3d', text: 'Impressoras 3D' },
      { icon: 'mdi-reload', text: 'Recarga de Toner' }
    ]
  },
  {
    id: 5,
    badge: 'Smartphones & Tablets',
    title: 'Smartphones <span style="color: #f39c12">Premium</span>',
    subtitle: 'As melhores marcas com condições especiais e assistência técnica especializada.',
    ctaText: 'Ver Ofertas',
    backgroundImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    overlayColor: 'rgba(243, 156, 18, 0.6)',
    tagColor: '#f39c12',
    buttonColor: '#27ae60',
    ctaLink: '/categoria/smartphones',
    features: [
      { icon: 'mdi-cellphone', text: 'Últimos Lançamentos' },
      { icon: 'mdi-camera', text: 'Câmeras Profissionais' },
      { icon: 'mdi-wrench', text: 'Assistência Autorizada' }
    ]
  },
  {
    id: 6,
    badge: 'Periféricos Gamer',
    title: 'Periféricos <span style="color: #e74c3c">Competitivos</span>',
    subtitle: 'Teclados, mouses, headsets e monitores para o máximo desempenho.',
    ctaText: 'Montar Setup',
    backgroundImage: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    overlayColor: 'rgba(231, 76, 60, 0.6)',
    tagColor: '#e74c3c',
    buttonColor: '#2c3e50',
    ctaLink: '/categoria/perifericos-gamer',
    secondaryCta: {
      text: 'Ver Reviews',
      link: '/reviews-perifericos'
    },
    features: [
      { icon: 'mdi-keyboard', text: 'Teclados Mecânicos' },
      { icon: 'mdi-mouse', text: 'Mouses RGB' },
      { icon: 'mdi-headset', text: 'Headsets 7.1' }
    ]
  },
  {
    id: 7,
    badge: 'Backup & Armazenamento',
    title: 'Armazenamento <span style="color: #3498db">Profissional</span>',
    subtitle: 'HDs, SSDs, NAS e soluções de backup para sua empresa ou uso pessoal.',
    ctaText: 'Proteger Dados',
    backgroundImage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    overlayColor: 'rgba(52, 152, 219, 0.6)',
    tagColor: '#3498db',
    buttonColor: '#e74c3c',
    ctaLink: '/categoria/armazenamento',
    features: [
      { icon: 'mdi-harddisk', text: 'SSDs NVMe' },
      { icon: 'mdi-server', text: 'NAS Empresarial' },
      { icon: 'mdi-cloud-upload', text: 'Backup em Nuvem' }
    ]
  },
  {
    id: 8,
    badge: 'Manutenção Preventiva',
    title: 'Manutenção <span style="color: #2ecc71">Preventiva</span>',
    subtitle: 'Limpeza, otimização e atualização para manter seu equipamento como novo.',
    ctaText: 'Agendar Manutenção',
    backgroundImage: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    overlayColor: 'rgba(46, 204, 113, 0.6)',
    tagColor: '#2ecc71',
    buttonColor: '#9b59b6',
    ctaLink: '/manutencao-preventiva',
    features: [
      { icon: 'mdi-broom', text: 'Limpeza Profunda' },
      { icon: 'mdi-speedometer', text: 'Otimização de Sistema' },
      { icon: 'mdi-update', text: 'Atualização de Drivers' }
    ]
  }
];

const getOverlayGradient = (overlayColor) => {
  return `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, ${overlayColor} 100%)`;
};

const navigateTo = (link) => {
  console.log('Navigating to:', link);
 
};
</script>

<style scoped>
.hero-carousel {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-container {
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.slide-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.slide-content {
  width: 83%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.content-wrapper {
  width: 70%;
  animation: slideIn 0.8s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
  border: 2px solid;
}

.title {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  line-height: 1.1;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.buttons-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.cta-button.primary {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.cta-button .material-symbols-outlined {
  transition: transform 0.3s ease;
}

.cta-button.primary:hover .material-symbols-outlined {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .features-list {
    gap: 0.5rem;
  }

  .feature-item {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }

  .cta-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
