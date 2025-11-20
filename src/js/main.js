// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 1. 移动端菜单切换
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuButton.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // 2. 导航栏滚动效果
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-dark/90', 'backdrop-blur-md', 'py-2', 'shadow-md');
      navbar.classList.remove('py-4');
    } else {
      navbar.classList.remove('bg-dark/90', 'backdrop-blur-md', 'py-2', 'shadow-md');
      navbar.classList.add('py-4');
    }
  });

  // 3. 多组产品滚动功能（通用绑定）
  const scrollLeftBtns = document.querySelectorAll('.scroll-left-btn');
  const scrollRightBtns = document.querySelectorAll('.scroll-right-btn');
  
  scrollLeftBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 找到当前按钮对应的产品容器
      const container = btn.nextElementSibling.nextElementSibling;
      container.scrollBy({ left: -350, behavior: 'smooth' });
    });
  });
  
  scrollRightBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.nextElementSibling;
      container.scrollBy({ left: 350, behavior: 'smooth' });
    });
  });

  // 4. FAQ折叠功能
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');
      
      // 切换当前FAQ的显示/隐藏
      answer.classList.toggle('hidden');
      icon.classList.toggle('fa-plus');
      icon.classList.toggle('fa-minus');
      icon.classList.toggle('rotate-45');
      
      // 关闭其他已展开的FAQ
      faqQuestions.forEach(otherQ => {
        if (otherQ !== question) {
          otherQ.nextElementSibling.classList.add('hidden');
          const otherIcon = otherQ.querySelector('i');
          otherIcon.classList.remove('fa-minus', 'rotate-45');
          otherIcon.classList.add('fa-plus');
        }
      });
    });
  });

  // // 5. 联系表单提交模拟
  // const contactForm = document.getElementById('contact-form');
  
  // if (contactForm) {
  //   contactForm.addEventListener('submit', (e) => {
  //     e.preventDefault();
      
  //     const submitBtn = contactForm.querySelector('button[type="submit"]');
  //     const originalText = submitBtn.innerHTML;
      
  //     // 提交状态提示
  //     submitBtn.disabled = true;
  //     submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> Sending...';
      
  //     // 模拟接口请求（1.5秒后完成）
  //     setTimeout(() => {
  //       submitBtn.innerHTML = '<i class="fa fa-check mr-2"></i> Sent Successfully!';
  //       submitBtn.classList.remove('bg-primary');
  //       submitBtn.classList.add('bg-green-600');
        
  //       // 重置表单
  //       contactForm.reset();
        
  //       // 恢复按钮状态
  //       setTimeout(() => {
  //         submitBtn.innerHTML = originalText;
  //         submitBtn.disabled = false;
  //         submitBtn.classList.remove('bg-green-600');
  //         submitBtn.classList.add('bg-primary');
  //       }, 3000);
  //     }, 1500);
  //   });
  // }

  // 6. 回到顶部按钮
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.remove('opacity-0', 'invisible');
      backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
      backToTopBtn.classList.add('opacity-0', 'invisible');
      backToTopBtn.classList.remove('opacity-100', 'visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 7. 锚点平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // 关闭移动端菜单（如果打开）
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 新增：8. 产品图片放大功能
  // 创建模态框元素（动态插入到body末尾）
  const createModal = () => {
    const modal = document.createElement('div');
    modal.className = 'img-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal"><i class="fa fa-times"></i></span>
        <img src="" alt="Enlarged product image" class="modal-img">
        <div class="modal-title"></div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  };

  // 初始化模态框
  const imgModal = createModal();
  const modalImg = imgModal.querySelector('.modal-img');
  const modalTitle = imgModal.querySelector('.modal-title');
  const closeModalBtn = imgModal.querySelector('.close-modal');

  // 打开模态框
  const openModal = (imgSrc, title) => {
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    imgModal.classList.add('active');
    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
  };

  // 关闭模态框
  const closeModal = () => {
    imgModal.classList.remove('active');
    // 恢复页面滚动
    document.body.style.overflow = '';
  };

  // 绑定放大图标点击事件
  const enlargeBtns = document.querySelectorAll('.enlarge-img-btn');
  enlargeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');
      openModal(imgSrc, title);
    });
  });

  // 绑定关闭模态框事件
  closeModalBtn.addEventListener('click', closeModal);
  
  // 点击模态框背景关闭
  imgModal.addEventListener('click', (e) => {
    if (e.target === imgModal) {
      closeModal();
    }
  });

  // 按ESC键关闭模态框
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imgModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 新增：9. 产品链接图标样式优化（可选，如需修改链接行为可在此添加）
  const productLinks = document.querySelectorAll('.product-link-btn');
  productLinks.forEach(link => {
    // 可添加链接点击事件，如跟踪统计等
    link.addEventListener('click', (e) => {
      console.log('Product link clicked:', link.href);
      // 如需自定义链接行为，可在此修改
    });
  });
});