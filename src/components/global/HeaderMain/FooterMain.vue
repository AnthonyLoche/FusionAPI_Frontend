<template>
    <footer class="site-footer">
        <div class="footer-container">
            <!-- Coluna 1: Logo e Informações -->
            <div class="footer-column footer-about">
                <div class="footer-brand">
                    <img 
                        src="@/assets/images/LogoFusion.png" 
                        alt="Fusion Virtual"
                        class="footer-logo"
                    />
                    <h3 class="company-name">Fusion Virtual</h3>
                </div>
                <p class="footer-description">
                    Mais de 20 anos oferecendo os melhores produtos de tecnologia com qualidade e confiança.
                </p>
                
                <div class="footer-badges">
                    <div class="badge">
                        <v-icon size="small" color="success">mdi-shield-check</v-icon>
                        <span>Compra 100% Segura</span>
                    </div>
                    <div class="badge">
                        <v-icon size="small">mdi-trophy</v-icon>
                        <span>Desde 2005 no mercado</span>
                    </div>
                </div>

                <div class="social-links">
                    <a 
                        href="https://facebook.com"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <v-icon>mdi-facebook</v-icon>
                    </a>
                    <a 
                        href="https://instagram.com"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <v-icon>mdi-instagram</v-icon>
                    </a>
                </div>
            </div>

            <!-- Coluna 2: Links Rápidos -->
            <div class="footer-column">
                <h4 class="footer-title">Links Rápidos</h4>
                <ul class="footer-links">
                    <li><router-link to="/catalogo">Catálogo</router-link></li>
                    <li><router-link to="/sobre">Sobre Nós</router-link></li>
                    <li><router-link to="/garantia">Garantia e Políticas</router-link></li>
                    <li><router-link to="/contato">Contato</router-link></li>
                </ul>
            </div>

            <!-- Coluna 3: Categorias -->
            <div class="footer-column">
                <h4 class="footer-title">Categorias</h4>
                <ul class="footer-links">
                    <li><router-link to="/categorias/notebooks">Notebooks</router-link></li>
                    <li><router-link to="/categorias/placas-video">Placas de Vídeo</router-link></li>
                    <li><router-link to="/categorias/processadores">Processadores</router-link></li>
                    <li><router-link to="/categorias/memorias">Memórias</router-link></li>
                    <li><router-link to="/categorias/armazenamento">Armazenamento</router-link></li>
                    <li><router-link to="/categorias/fontes">Fontes</router-link></li>
                    <li><router-link to="/categorias/gabinetes">Gabinetes</router-link></li>
                </ul>
            </div>

            <!-- Coluna 4: Contato -->
            <div class="footer-column footer-contact">
                <h4 class="footer-title">Contato</h4>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <v-icon size="small">mdi-map-marker</v-icon>
                        <div>
                            <p>R. Papa João XXIII, 193 - Iririú, Joinville - SC.</p>
                            <p>89227-300</p>
                            <p class="text-muted">Atendimento em todo Brasil</p>
                        </div>
                    </div>

                    <div class="contact-item">
                        <v-icon size="small">mdi-phone</v-icon>
                        <div>
                            <p>(47) 99955-5761</p>
                            <p class="text-muted">Seg a Sex 9h às 18h</p>
                        </div>
                    </div>

                    <div class="contact-item">
                        <v-icon size="small">mdi-email</v-icon>
                        <div>
                            <p>sacfusionvirtual@gmail.com</p>
                        </div>
                    </div>

                    <div class="contact-item">
                        <v-icon size="small">mdi-file-document</v-icon>
                        <div>
                            <p class="text-muted">CNPJ</p>
                            <p>05.771.136/0001-19</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
            <div class="footer-container">
                <div class="footer-bottom-content">
                    <p class="copyright">
                        © {{ currentYear }} Fusion Virtual. Todos os direitos reservados.
                    </p>
                    
                    <div class="footer-bottom-badges">
                        <span class="badge-item">
                            <v-icon size="small">mdi-lock</v-icon>
                            SSL Seguro
                        </span>
                        <span class="separator">•</span>
                        <span class="badge-item">Desde 2005</span>
                        <span class="separator">•</span>
                        <span class="badge-item">50k+ Clientes</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.site-footer {
    background: white;
    color: #4b5563;
    padding-top: 60px;
    border-top: 1px solid #e5e7eb;
}

.footer-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
}

.footer-container:first-child {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 48px;
    margin-bottom: 40px;
}

.footer-column {
    display: flex;
    flex-direction: column;
}

/* Logo e Informações */
.footer-brand {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}

.footer-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 8px;
}

.company-name {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
    margin: 0;
}

.footer-description {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 20px;
    color: #6b7280;
}

.footer-badges {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #4b5563;
}

.badge .v-icon {
    color: var(--color-primary);
}

.social-links {
    display: flex;
    gap: 12px;
}

.social-links a {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    transition: all 0.3s ease;
    text-decoration: none;
}

.social-links a:hover {
    background: var(--color-primary);
    color: white;
    transform: translateY(-2px);
}

/* Títulos das colunas */
.footer-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Links */
.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-links a {
    color: #6b7280;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-block;
}

.footer-links a:hover {
    color: var(--color-primary);
    transform: translateX(4px);
}

/* Contato */
.contact-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.contact-item {
    display: flex;
    gap: 12px;
    font-size: 14px;
}

.contact-item .v-icon {
    color: var(--color-primary);
    margin-top: 2px;
}

.contact-item p {
    margin: 0;
    line-height: 1.5;
    color: #4b5563;
}

.contact-item .text-muted {
    color: #9ca3af;
    font-size: 13px;
}

/* Bottom Bar */
.footer-bottom {
    border-top: 1px solid #e5e7eb;
    padding: 24px 0;
    margin-top: 40px;
    background: #f9fafb;
}

.footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.copyright {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
}

.footer-bottom-badges {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    color: #6b7280;
}

.badge-item {
    display: flex;
    align-items: center;
    gap: 6px;
}

.badge-item .v-icon {
    color: var(--color-primary);
}

.separator {
    color: #d1d5db;
}

/* Responsividade */
@media (max-width: 1024px) {
    .footer-container:first-child {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }
}

@media (max-width: 768px) {
    .site-footer {
        padding-top: 40px;
    }

    .footer-container:first-child {
        grid-template-columns: 1fr;
        gap: 32px;
    }

    .footer-bottom-content {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .footer-bottom-badges {
        flex-wrap: wrap;
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .footer-brand {
        flex-direction: column;
        align-items: flex-start;
    }

    .footer-logo {
        width: 50px;
        height: 50px;
    }

    .social-links a {
        width: 36px;
        height: 36px;
    }
}
</style>