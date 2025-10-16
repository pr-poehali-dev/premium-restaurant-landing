import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения бронирования.');
    setFormData({ name: '', phone: '', date: '', time: '', guests: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const gallery = [
    {
      url: 'https://cdn.poehali.dev/projects/7c2be36d-56de-4cc0-801b-f90d8485795e/files/c3c7f1c7-d7f6-4dfb-97b0-8669dbd0c749.jpg',
      title: 'Уютный зал',
      description: 'Традиционная болгарская атмосфера'
    },
    {
      url: 'https://cdn.poehali.dev/projects/7c2be36d-56de-4cc0-801b-f90d8485795e/files/887092c3-52e2-42d0-a616-1aa4fde39cb0.jpg',
      title: 'Основной зал',
      description: 'Аутентичный интерьер в стиле механы'
    },
    {
      url: 'https://cdn.poehali.dev/projects/7c2be36d-56de-4cc0-801b-f90d8485795e/files/f41c25b6-992e-4c89-8eee-729b66ac0dad.jpg',
      title: 'Народный зал',
      description: 'Традиционные узоры и тёплый свет'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://cdn.poehali.dev/files/992f570b-37d2-4dd4-a25a-ac9e08aa5e2e.jpg')`
          }}
        />
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider text-white">
            MEYHANA
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light tracking-wide">
            Болгарская кухня и гостеприимство
          </p>
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Забронировать столик
          </Button>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-light mb-6">Наша атмосфера</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Каждая деталь создана для вашего комфорта и наслаждения
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gallery.map((item, index) => (
            <Card 
              key={index}
              className="overflow-hidden group cursor-pointer border-border bg-card hover:border-accent transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-light mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="booking" className="py-24 px-4 md:px-8 bg-secondary/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-light mb-6">Бронирование</h2>
            <p className="text-xl text-muted-foreground">
              Зарезервируйте столик для незабываемого вечера
            </p>
          </div>

          <Card className="border-border bg-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background border-border"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-background border-border"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Время</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Гостей</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="bg-background border-border"
                      placeholder="2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Пожелания</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-background border-border min-h-24"
                    placeholder="Особые пожелания или комментарии..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-6 text-lg transition-all duration-300 hover:scale-105"
                >
                  Забронировать
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-light mb-6">Контакты</h2>
            <p className="text-xl text-muted-foreground">
              Мы всегда рады вашему визиту
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 animate-slide-up">
                <div className="mt-1">
                  <Icon name="MapPin" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Адрес</h3>
                  <p className="text-muted-foreground">
                    г. Москва, ул. Пречистенка, д. 12<br />
                    Метро «Кропоткинская»
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="mt-1">
                  <Icon name="Phone" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Телефон</h3>
                  <p className="text-muted-foreground">
                    +7 (495) 123-45-67<br />
                    Ежедневно с 12:00 до 23:00
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="mt-1">
                  <Icon name="Mail" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    info@elegance-restaurant.ru
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="mt-1">
                  <Icon name="Clock" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Часы работы</h3>
                  <p className="text-muted-foreground">
                    Понедельник - Четверг: 12:00 - 23:00<br />
                    Пятница - Суббота: 12:00 - 01:00<br />
                    Воскресенье: 12:00 - 22:00
                  </p>
                </div>
              </div>
            </div>

            <div className="h-96 md:h-auto min-h-96 rounded-lg overflow-hidden border border-border animate-scale-in">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A64b07ef215c9c54f45e3d9ff7d3f3d0bc4b06f7de5f0c5d4df5d0c0c1c0c0c0c&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 md:px-8 bg-secondary/30 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-light mb-4">MEYHANA</h3>
          <p className="text-muted-foreground mb-6">
            © 2024 Meyhana Restaurant. Все права защищены.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Facebook" size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Twitter" size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;