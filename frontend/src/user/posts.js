import styled from "styled-components";

const Post = styled.div`
ul {
    height: 300px; 
    overflow: auto;
    list-style:none;
}
.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
    padding: 0;
    text-align: center;
    
    @media (max-width: 550px) {
      flex-direction: column;
    }
    
  }
  
  .card {
    position: relative;
    width: 15%;
    margin: 1%;
    background: whiteSmoke;
    box-shadow: 1px 1px 5px #999;
    
    @media (max-width: 815px) {
      width: 48%;
    }
    
    @media (max-width: 550px) {
      width: 100%;
    }

    &__link {
        height: 100%;
        width:100%;
    }
    .imgst {
      width:100%;
      height:100%;
    }
  
    &__inner {
        width:100%;
        height:100%;
      position: relative;
      background-size: cover;
      overflow: hidden;
  
      h2 {
        color: white;
        margin: 0;
        padding: 30% 0;
        text-shadow: 1px 1px 3px #000;
        line-height: 18px;
        text-transform: uppercase;
        
        small {
          font-style: italic;
          display: inherit;
        }
      }
    
    }
  
    &__tagline {
      font-size: 1rem;
      font-weight: 100;
    }
    
    &__icons {
      margin: 0 0 50px;
      padding: 0;
      list-style: none;
      
      li {
        display: inline-block;
        padding: 0 10px 10px;
        
      }
      
      .fa {
        font-size: .8rem;
        
        &:before {
          font-size: 1.2rem;
          display: block;
          padding-bottom: 5px;
        }
      }
      
    }
    
  }`
export default Post;