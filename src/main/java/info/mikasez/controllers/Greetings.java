package info.mikasez.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
   public class Greetings {
        @RequestMapping("/{name}")
        public String greeting(@PathVariable String name, Model model) {
            model.addAttribute("name", name);
            System.out.println(name);
            return "greeting";
        }
    }

