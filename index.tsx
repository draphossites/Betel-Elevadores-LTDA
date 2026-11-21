import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, ShieldCheck, Wrench, Settings2, FileCheck2, HardHat, BadgeCheck, Check, Clock3, Phone, Menu, X, Instagram, Headset, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactMessage, whatsappUrl } from "@/lib/betel-contact";
import lobby from "@/assets/betel-lobby.asset.json";
import residential from "@/assets/betel-residential.asset.json";
import controls from "@/assets/betel-controls.asset.json";

const title = "Betel Elevadores | Segurança, Engenharia e Manutenção";
const description = "Manutenção preventiva, corretiva e modernização de elevadores com responsabilidade técnica no CREA-RS. Solicite seu orçamento à Betel Elevadores.";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ...(lobby.url.startsWith("https://") ? [{ property: "og:image", content: lobby.url }, { name: "twitter:image", content: lobby.url }] : []),
  ] }),
  component: Index,
});

const navigation = [
  ["Início", "inicio"], ["Serviços", "servicos"], ["Responsabilidade Técnica", "responsabilidade"], ["Diferenciais", "diferenciais"], ["Contato", "contato"],
];
const services = [
  { icon: ShieldCheck, title: "Manutenção Preventiva", description: "Planos periódicos para evitar paradas inesperadas e prolongar a vida útil do seu elevador." },
  { icon: Wrench, title: "Corretiva e Emergencial", description: "Atendimento ágil e diagnóstico preciso para restabelecer o funcionamento com segurança." },
  { icon: Settings2, title: "Modernização de Elevadores", description: "Atualização de comandos, cabines e sistemas de segurança. Mais eficiência, conforto e tecnologia." },
  { icon: FileCheck2, title: "Laudos e Adequação às Normas", description: "Inspeções técnicas, emissão de ART e regularização do equipamento junto aos órgãos competentes." },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.5L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.6Z" /><path d="M8 7.5c-.6.1-1 1-1 1.6 0 2.6 3.9 6.4 6.6 6.4.7 0 1.7-.5 1.8-1.2l.1-.8-2.3-1.1-.9 1c-1.5-.6-2.6-1.7-3.2-3.1l.9-.9-1.1-2Z" /></svg>;
}

function Brand() {
  return <a href="#inicio" className="brand" aria-label="Betel Elevadores — início"><span className="brand-symbol"><ArrowUp /><ArrowDown /></span><span><span className="brand-name">BETEL<span className="text-action">.</span></span><span className="brand-subtitle block">ELEVADORES</span></span></a>;
}

function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = contactMessage({ name: String(data.get("name") ?? ""), company: String(data.get("company") ?? ""), phone: String(data.get("phone") ?? ""), service: String(data.get("service") ?? "") });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-field"><label htmlFor="name">Seu nome</label><input id="name" name="name" placeholder="Nome completo" autoComplete="name" required maxLength={120} /></div>
    <div className="form-field"><label htmlFor="company">Condomínio / Empresa</label><input id="company" name="company" placeholder="Nome do condomínio ou empresa" autoComplete="organization" required maxLength={160} /></div>
    <div className="form-field"><label htmlFor="phone">Telefone / WhatsApp</label><input id="phone" name="phone" type="tel" placeholder="(51) 99999-9999" autoComplete="tel" required maxLength={25} /></div>
    <div className="form-field"><label htmlFor="service">Tipo de serviço</label><select id="service" name="service" required defaultValue=""><option value="" disabled>Selecione o serviço</option>{services.map(service => <option key={service.title}>{service.title}</option>)}<option>Visita técnica / Outros</option></select></div>
    <div className="form-submit"><Button variant="cta" type="submit"><WhatsAppIcon /> Solicitar orçamento pelo WhatsApp <ArrowUpRight /></Button><p>Seus dados serão encaminhados para uma conversa no WhatsApp.</p></div>
  </form>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <header className="site-header"><div className="page-width header-inner"><Brand /><nav aria-label="Navegação principal" className="desktop-nav">{navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><Button asChild variant="cta" className="header-cta"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Solicitar Orçamento <ArrowUpRight /></a></Button><Button className="mobile-menu-toggle" variant="ghost" size="icon" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>{menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel">{navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<Button asChild variant="cta"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Solicitar Orçamento <ArrowUpRight /></a></Button></nav>}</header>
    <main>
      <section className="hero" id="inicio"><img className="hero-image" src={lobby.url} alt="Elevadores modernos em um ambiente corporativo — imagem ilustrativa" fetchPriority="high" /><div className="page-width hero-content"><div className="eyebrow">Engenharia que eleva a sua confiança</div><h1>Segurança, Tecnologia<br />e Precisão em<br /><span>Transporte Vertical.</span></h1><p className="hero-description">Manutenção preventiva, corretiva e modernização de elevadores com rigor técnico e acompanhamento de engenharia especializada.</p><div className="hero-actions"><Button asChild variant="cta"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Falar com Especialista no WhatsApp <ArrowUpRight /></a></Button><Button asChild variant="heroOutline"><a href="#servicos">Conhecer Nossos Serviços <ArrowDown /></a></Button></div><div className="hero-note"><ShieldCheck className="size-4" /> Responsabilidade técnica. Segurança em cada movimento.</div></div><span className="hero-caption">Arquitetura e elevadores · Imagem ilustrativa</span></section>
      <div className="trust-strip"><div className="page-width trust-inner">{[{ icon: ShieldCheck, title: "Segurança em primeiro lugar", text: "Compromisso em cada serviço" }, { icon: HardHat, title: "Engenharia especializada", text: "Responsabilidade técnica CREA-RS" }, { icon: FileCheck2, title: "Conformidade técnica", text: "Atuação conforme normas vigentes" }, { icon: Headset, title: "Atendimento direto", text: "Agilidade e proximidade com você" }].map(item => <div className="trust-item" key={item.title}><item.icon /><div><strong>{item.title}</strong><small>{item.text}</small></div></div>)}</div></div>
      <section id="servicos" className="section"><div className="page-width"><div className="section-heading"><div><div className="eyebrow">Soluções completas</div><h2>Cuidado técnico em cada nível.</h2></div><p>Da prevenção à modernização, soluções que mantêm seu elevador seguro e o seu dia em movimento.</p></div><div className="services-grid">{services.map((service, i) => <article className="service-card" key={service.title}><div className="service-top"><div className="service-icon"><service.icon /></div><span className="service-number">0{i + 1}</span></div><h3>{service.title}</h3><p>{service.description}</p><Button asChild variant="link"><a href={whatsappUrl(`Olá, gostaria de saber mais sobre ${service.title} com a Betel Elevadores.`)} target="_blank" rel="noopener noreferrer">Saiba mais <ArrowUpRight /></a></Button></article>)}</div></div></section>
      <section id="responsabilidade" className="section technical-section"><div className="page-width technical-layout"><div><div className="eyebrow">Responsabilidade técnica</div><h2>Sua tranquilidade tem<br />respaldo de engenharia.</h2><p className="technical-description">Na Betel Elevadores, segurança não é apenas uma promessa. É compromisso técnico. Atuamos sob supervisão de profissionais responsáveis, com rigor de engenharia e atenção às normas vigentes.</p><div className="technical-badges"><span><ShieldCheck /> Conformidade Técnica</span><span><BadgeCheck /> CREA-RS</span><span><Check /> Compromisso com a Segurança</span></div></div><div><div className="professional"><div className="professional-icon"><HardHat /></div><div><p className="professional-label">ENGENHEIRO MECÂNICO RESPONSÁVEL</p><h3>Luciano Valério Lopes Soares</h3><p className="professional-register">CREA-RS 84602</p></div></div><div className="professional"><div className="professional-icon"><Wrench /></div><div><p className="professional-label">TÉCNICO RESPONSÁVEL</p><h3>Edson Rejes Barros</h3></div></div><p className="technical-bottom"><ShieldCheck className="size-5 shrink-0" /> Mais segurança para síndicos, administradoras de condomínios e empresas.</p></div></div></section>
      <section id="diferenciais" className="section"><div className="page-width"><div className="eyebrow">O jeito Betel de cuidar</div><h2>Precisão no trabalho. Proximidade no atendimento.</h2><div className="differences-grid">{[{ icon: Clock3, title: "Agilidade com responsabilidade", text: "Diagnóstico preciso e atenção às necessidades do seu equipamento, sem abrir mão da segurança." }, { icon: Settings2, title: "Soluções para o seu elevador", text: "Um olhar técnico para cada instalação, com manutenção e modernização adequadas à sua realidade." }, { icon: Headset, title: "Contato direto e transparente", text: "Converse com quem entende do assunto. Orientação clara do primeiro contato à conclusão do serviço." }].map(item => <div className="difference" key={item.title}><item.icon /><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></div></section>
      <section className="section projects-section" id="projetos"><div className="page-width"><div className="section-heading"><div><div className="eyebrow">Nossos projetos e estrutura</div><h2>Engenharia para diferentes realidades.</h2></div><p>Condomínios, ambientes corporativos e sistemas de comando. Conheça nossas frentes de atuação.</p></div><div className="project-grid">{[{ image: residential.url, title: "Condomínios Residenciais", text: "Manutenção e cuidado para a segurança e o conforto de quem chama seu condomínio de lar." }, { image: lobby.url, title: "Prédios Comerciais", text: "Confiabilidade e eficiência no transporte vertical para acompanhar a rotina da sua empresa." }, { image: controls.url, title: "Modernização de Painéis", text: "Tecnologia aplicada a comandos e sistemas para um elevador mais seguro e eficiente." }].map(project => <article className="project-card" key={project.title}><div className="project-photo"><img src={project.image} alt={`${project.title} — imagem ilustrativa`} loading="lazy" /><span>Imagem ilustrativa</span></div><div className="project-text"><h3>{project.title}</h3><p>{project.text}</p></div></article>)}</div></div></section>
      <section id="contato" className="section"><div className="page-width contact-layout"><div className="contact-copy"><div className="eyebrow">Vamos conversar</div><h2>Precisa de um orçamento<br />ou visita técnica?</h2><p>Para o seu condomínio ou empresa, conte com um atendimento direto e sem burocracia. Nossa equipe está pronta para entender o que você precisa.</p><Button asChild variant="cta" className="contact-phone"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> (51) 99783-1110 <ArrowUpRight /></a></Button><a href="tel:+5551997831110" className="contact-detail"><Phone className="size-4" /> Prefere ligar? Fale com a nossa equipe <ChevronRight className="size-3" /></a></div><ContactForm /></div></section>
    </main>
    <footer className="site-footer"><div className="page-width"><div className="footer-main"><div className="footer-brand"><Brand /><p>Segurança, tecnologia e precisão.<br />Engenharia que eleva a sua confiança.</p></div><div><h3>RESPONSABILIDADE TÉCNICA</h3><p>Eng. Mecânico Luciano Valério Lopes Soares<br />CREA-RS 84602<br />Técnico Responsável: Edson Rejes Barros</p></div><div><h3>FALE COM A BETEL</h3><a className="footer-contact" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-4" /> (51) 99783-1110</a><span className="mt-4 inline-flex" title="Perfil empresarial do Instagram em breve" aria-label="Instagram: perfil empresarial em breve"><Instagram className="size-4" /></span></div></div><div className="footer-bottom"><p>© 2026 Betel Elevadores. Todos os direitos reservados.</p><p>Compromisso com a segurança em cada movimento.</p></div></div></footer>
    <Button asChild variant="whatsapp" className="floating-whatsapp" size="icon"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Betel Elevadores no WhatsApp" title="Fale com a Betel no WhatsApp"><WhatsAppIcon /></a></Button>
  </>;
}
