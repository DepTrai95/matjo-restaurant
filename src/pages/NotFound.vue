<template>
    <section>
       <div class="inner">
          <div class="text-center">
             <h2>Whooops</h2>
             <p>
                Diese Seite konnte leider nicht gefunden werden. Sie könnte gelöscht worden sein
                Zurück zur
             </p>
             <router-link to="/" class="btn--primary">← Zurück zur Homepage</router-link>
          </div>
       </div>
    </section>
 </template>
 
 <style lang="scss" scoped>
 section {
    margin-block: 7rem;
 }
 
 .btn--primary {
    background-color: transparent;
    border: 2px solid transparent;
    border-radius: 4px;
    box-shadow: 0px 5px 20px 5px rgba(80, 80, 80, 0.2);
    color: inherit;
    cursor: pointer;
    font-size: inherit;
    height: unset !important;
    justify-content: center;
    line-height: 1.5;
    margin-block: 1.5rem;
    min-height: 3rem;
    min-width: 170px;
    outline: 1px solid transparent;
    padding: 10px;
    text-decoration: none;
    transition: background-color 0.2s ease-in, border-color 0.2s ease-in, box-shadow 0.3s ease-in, color 0.3s ease-in-out, outline 0.3s ease-in-out;
 
    +.btn--primary {
       margin-inline: 2rem;
    }
 }
 
 .btn--primary {
    background-color: $color-primary;
    color: $color-white;
 
    &:hover {
       background-color: $color-header;
       border-color: $color-header;
    }
 }
 </style>