<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/{vueRouting<.*>}", name="app", defaults={"vueRouting"=""})
     */
    public function index(): Response
    {
        return $this->render('app/index.html.twig');
    }
}
